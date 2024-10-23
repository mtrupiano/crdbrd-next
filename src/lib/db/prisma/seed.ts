import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "user1@test.com",
        role: "ADMIN",
      },
      {
        email: "user2@test.com",
        role: "USER",
      },
      {
        email: "user3@test.com",
        role: "USER",
      },
      {
        email: "user4@test.com",
        role: "USER",
      },
      {
        email: "user5@test.com",
        role: "USER",
      },
      {
        email: "use6@test.com",
        role: "USER",
      },
      {
        email: "user7@test.com",
        role: "USER",
      },
      {
        email: "user8@test.com",
        role: "USER",
      },
      {
        email: "user9@test.com",
        role: "USER",
      },
      {
        email: "user10@test.com",
        role: "USER",
      },
      {
        email: "user12@test.com",
        role: "USER",
      },
      {
        email: "user13@test.com",
        role: "USER",
      },
      {
        email: "user14@test.com",
        role: "USER",
      },
      {
        email: "user15@test.com",
        role: "USER",
      },
      {
        email: "user16@test.com",
        role: "USER",
      },
      {
        email: "user17@test.com",
        role: "USER",
      },
      {
        email: "user18@test.com",
        role: "USER",
      },
      {
        email: "user19@test.com",
        role: "USER",
      },
      {
        email: "user20@test.com",
        role: "USER",
      },
      {
        email: "user21@test.com",
        role: "USER",
      },
      {
        email: "user22@test.com",
        role: "USER",
      },
      {
        email: "user23@test.com",
        role: "USER",
      },
      {
        email: "user24@test.com",
        role: "USER",
      },
      {
        email: "user25@test.com",
        role: "USER",
      },
      {
        email: "user26@test.com",
        role: "USER",
      },
    ],
  });

  await prisma.collectionSpace.createMany({
    data: [
      {
        userId: 1,
        name: "First collection",
      },
      {
        userId: 2,
        name: "Second user's first collection",
      },
      {
        userId: 1,
        name: "Second collection",
      },
    ],
  });

  await prisma.realWorldLocation.createMany({
    data: [
      {
        name: "Deck 1",
        description: "My first deck",
        locationType: "DECK",
        collectionSpaceId: 1,
      },
      {
        name: "Deck 2",
        description: "User 2's main binder",
        locationType: "BINDER",
        collectionSpaceId: 2,
      },
    ],
  });

  await prisma.collectedCard.createMany({
    data: [
      {
        multiverseId: "aaaa",
        locationId: 1,
      },
      {
        multiverseId: "asdfasdf",
        locationId: 1,
      },
      {
        multiverseId: "xxx",
        locationId: 2,
      },
    ],
  });

  await prisma.customCardAttribute.createMany({
    data: [
      {
        name: "autograph maro",
        description: "Autographed by Mark Rosewater",
        collectionSpaceId: 1,
      },
      {
        name: "autograph mtru",
        collectionSpaceId: 1,
      },
      {
        name: "autograph ipakers",
        collectionSpaceId: 2,
      },
    ],
  });

  await prisma.attributesOnCards.createMany({
    data: [
      {
        cardId: 1,
        attributeId: 1,
      },
      {
        cardId: 1,
        attributeId: 2,
      },
      {
        cardId: 2,
        attributeId: 2,
      },
      {
        cardId: 3,
        attributeId: 3,
      },
    ],
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
