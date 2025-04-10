"use server";

import z from "zod";
import { zfd } from "zod-form-data";
import { authSafeActionClient } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";
import { Prisma, Visibility } from "@prisma/client";
import { returnValidationErrors } from "next-safe-action";

const FetchCollectionsSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

const CreateCollectionFormSchema = zfd.formData({
  name: zfd.text(z.string().min(1)),
  description: zfd.text(z.string().max(256).optional()),
  visibility: zfd.text(
    z.enum([Visibility.PRIVATE, Visibility.PUBLIC, Visibility.UNLISTED]),
  ),
});

export const deleteCollection = async (collectionSpaceId: string) => {
  const result = await prisma.collectionSpace.update({
    where: {
      id: collectionSpaceId,
    },
    data: {
      archivedAt: new Date(),
    },
  });
  revalidatePath("/");
  return result;
};

export const fetchCollections = authSafeActionClient
  .schema(FetchCollectionsSchema)
  .action(async ({ ctx, clientInput }) => {
    const { skip, take } = clientInput;
    const { userId } = ctx;

    const [collections, total] = await prisma.$transaction([
      prisma.collectionSpace.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
        include: {
          _count: {
            select: {
              realWorldLocations: true,
              cards: true,
            },
          },
        },
      }),
      prisma.collectionSpace.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      collections,
      metadata: {
        hasNextPage: take + skip < total,
        totalPages: Math.ceil(10 / total),
      },
    };
  });

export const createCollectionSpace = authSafeActionClient
  .schema(CreateCollectionFormSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { name, description, visibility } = parsedInput;
    try {
      const newCollection = await prisma.collectionSpace.create({
        data: {
          description: description?.trim(),
          name: name?.trim(),
          visibility,
          user: {
            connect: {
              id: ctx.userId,
            },
          },
        },
      });
      revalidatePath("/");
      return newCollection;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          returnValidationErrors(CreateCollectionFormSchema, {
            name: {
              _errors: ["A Collection with that name already exists"],
            },
          });
        }
      } else {
        throw new Error();
      }
    }
  });
