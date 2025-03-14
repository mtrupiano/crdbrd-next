import { builder } from "../builder";

builder.queryField("cardsInCollection", (t) =>
  t.prismaConnection({
    type: "CollectedCard",
    cursor: "id",
    args: {
      collectionSpaceId: t.arg({
        type: "ID",
        description: "CollectionSpace database UUID",
      }),
    },
    resolve: (query, root, args) => {
      return prisma.collectedCard.findMany({
        ...query,
        where: {
          collectionSpaceId: args.collectionSpaceId,
        },
      });
    },
  }),
);

builder.queryField("cardsInLocation", (t) =>
  t.prismaConnection({
    type: "CollectedCard",
    cursor: "id",
    args: {
      locationId: t.arg({
        type: "ID",
        description: "Location database UUID",
      }),
    },
    resolve: (query, root, args) => {
      return prisma.collectedCards.findMany({
        ...query,
        where: {
          locationId: args.locationId,
        },
      });
    },
  }),
);
