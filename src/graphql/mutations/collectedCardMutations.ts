import { builder } from "../builder";
builder.mutationField("collectCard", (t) =>
  t.prismaField({
    type: "CollectedCard",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      collectionId: t.arg({ type: "ID" }),
      locationId: t.arg({ type: "ID" }),
      multiverseId: t.arg({ type: "ID" }),
      attributes: t.arg({
        type: ["ID"],
      }),
    },
    resolve: (query, root, args, context) => {
      const { user } = context;
      const { collectionId, locationId, multiverseId, attributes } = args;
      const createdCards = prisma.collectedCard.create({
        ...query,
        data: {
          userId: user.id,
          collectionId,
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
