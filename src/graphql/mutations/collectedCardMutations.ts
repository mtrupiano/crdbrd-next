import { builder } from "../builder";

builder.mutationField("updateCardLocation", (t) =>
  t.prismaField({
    type: "CollectedCard",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      locationId: t.arg({ type: "String" }),
      cardIds: t.arg({ type: ["String"], required: true }),
    },
    resolve: (query, root, args) => {
      const { locationId, cardIds } = args;
      return prisma.$executeRaw`
        update CollectedCard
        set locationId = ${locationId}
        where id in (${cardIds.join(", ")});
      `;
    },
  }),
);

builder.mutationField("collectCard", (t) =>
  t.prismaField({
    type: "CollectedCard",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      collectionId: t.arg({ type: "String", required: true }),
      locationId: t.arg({ type: "String" }),
      multiverseId: t.arg({ type: "String", required: true }),
      attributes: t.arg({
        type: ["String"],
      }),
    },
    resolve: (query, root, args, context) => {
      const { user } = context;
      const { collectionId, locationId, multiverseId, attributes } = args;
      console.log({
        collectionId,
        locationId,
        multiverseId,
        attributes,
      });
      const createdCards = prisma.collectedCard.create({
        ...query,
        data: {
          userId: user.id,
          collectionSpaceId: collectionId,
          locationId,
          multiverseId,
        },
        include: {
          attributes: true,
        },
      });
      console.log({
        createdCards,
      });
      return createdCards;
    },
  }),
);
