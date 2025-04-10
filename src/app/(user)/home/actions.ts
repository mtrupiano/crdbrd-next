"use server";

import z from "zod";
import { zfd } from "zod-form-data";
import { authSafeActionClient } from "@/lib/safeAction";
import { revalidatePath } from "next/cache";

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
        totalPages: Math.ceil(total / take),
      },
    };
  });

export const createCollectionSpace = authSafeActionClient
  .schema(CreateCollectionFormSchema)
  .action(async ({ ctx, clientInput }) => {
    const parsed = CreateCollectionFormSchema.safeParse(clientInput);
    const {
      "collection-name": name,
      "collection-description": description,
      "collection-visibility": visibility,
    } = parsed.data;
    try {
      const newCollection = await prisma.collectionSpace.create({
        data: {
          description,
          name,
          visibility: visibility.toUpperCase(),
          user: {
            connect: {
              id: ctx.userId,
            },
          },
        },
      });
      console.log({ newCollection });
      revalidatePath("/");
      return newCollection;
    } catch (error) {
      console.log({ error });
      // return error;
      throw new Error(error);
    }
  });
