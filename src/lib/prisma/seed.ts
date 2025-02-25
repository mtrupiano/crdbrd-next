import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "BOINK@test.com",
      password: "testpass",
      role: "ADMIN",
    },
  });

  const collection = await prisma.collectionSpace.create({
    data: {
      name: "First Collection",
      description: "Description of first collection",
      user: {
        connect: user,
      },
    },
  });

  const firstLocation = await prisma.realWorldLocation.create({
    data: {
      user: {
        connect: user,
      },
      collectionSpace: {
        connect: collection,
      },
      name: "First Real World Location",
      description: "Description of first real world location",
    },
  });

  await prisma.collectedCard.create({
    data: {
      user: { connect: user },
      collectionSpace: { connect: collection },
      realWorldLocation: { connect: firstLocation },
      attributes: {
        create: {
          attribute: {
            create: {
              name: "signed I.P.",
              description: "Signed Isaac Perry",
              collectionSpace: { connect: collection },
              user: { connect: user },
            },
          },
        },
      },
      multiverseId: "690483", // Multiverse ID for Howler's Heavy
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
