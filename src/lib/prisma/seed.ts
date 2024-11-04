import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       email: "user1@test.com",
  //       role: "ADMIN",
  //     },
  //     {
  //       email: "user2@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user3@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user4@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user5@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "use6@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user7@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user8@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user9@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user10@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user12@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user13@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user14@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user15@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user16@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user17@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user18@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user19@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user20@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user21@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user22@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user23@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user24@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user25@test.com",
  //       role: "USER",
  //     },
  //     {
  //       email: "user26@test.com",
  //       role: "USER",
  //     },
  //   ],
  // });

  // await prisma.collectedCard.create({
  //   data: {
  //     multiverseId: "234123",
  //   },
  // });

  const user = await prisma.user.create({
    data: {
      email: "BOINK@test.com",
      password: "testpass",
      role: "ADMIN",
      collections: {
        create: {
          description: "This is my first collection",
          name: "FIRST COLLECTION",
          customCardAttributes: {
            create: {
              name: "autograph Mark Trupiano",
              description: "This card was autographed by Mark Trupiano",
              cardsWithAttribute: {
                create: {
                  card: {
                    create: {
                      multiverseId: "234123",
                    },
                  },
                },
              },
            },
          },
          realWorldLocations: {
            create: {
              name: "Deck 1",
              cards: {
                createMany: {
                  data: [
                    {
                      multiverseId: "123456",
                    },
                    {
                      multiverseId: "123457",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  });

  await prisma.collectionSpace.create({
     data: {
       name: "SECOND COLLECTION",
       description: "This is my second collection",
       user: {
         connect: {
           id: user.id,
         },
       },
       customCardAttributes: {
         create: {
           name: "signed I.P.",
           description: "Autographed by Isaac Perry",
           cardsWithAttribute: {
             create: {
               card: {
                 create: {
                   multiverseId: "234123",
                 },
               },
             },
           },
         },
       },
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
