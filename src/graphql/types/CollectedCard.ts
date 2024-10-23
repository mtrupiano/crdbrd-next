import { builder } from "../builder";

builder.prismaObject("CollectedCard", {
  fields: (t) => ({
    id: t.exposeID("id"),
    multiverseId: t.exposeString("multiverseId"),
    locationId: t.exposeID("locationId"),
    attributes: t.relation("attributes"),
  }),
});

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
        type: "Int",
        description: "",
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
