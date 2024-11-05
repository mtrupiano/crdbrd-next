import { builder } from "../builder";

builder.queryField("cards", (t) =>
  t.prismaConnection({
    type: "CollectedCard",
    cursor: "id",
    resolve: (query) => {
      return prisma.collectedCards.findMany({ ...query });
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
        description: "Location UUID",
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
