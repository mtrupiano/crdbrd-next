import { builder } from "../builder";
import { VISIBILITY } from "./Visibility";

builder.prismaObject("RealWorldLocation", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    locationType: t.expose("locationType", { type: LOCATION_TYPE }),
    collectionSpaceId: t.exposeID("collectionSpaceId"),
    visibility: t.expose("visibility", { type: VISIBILITY }),
    cards: t.relation("cards"),
  }),
});

const LOCATION_TYPE = builder.enumType("RealWorldLocationType", {
  values: ["BINDER", "DECK", "CUBE"] as const,
});

builder.queryField("realWorldLocationsInCollection", (t) =>
  t.prismaConnection({
    type: "RealWorldLocation",
    args: {
      collectionId: t.arg({
        type: "Int",
        description: "Collection's database ID",
      }),
    },
    cursor: "id",
    resolve: (query, root, args) => {
      return prisma.realWorldLocation.findMany({
        ...query,
        where: {
          collectionSpaceId: args.collectionId,
        },
      });
    },
  }),
);

builder.queryField("realWorldLocation", (t) =>
  t.prismaField({
    type: "RealWorldLocation",
    args: {
      id: t.arg({
        type: "Int",
        description: "RealWorldLocation database ID",
      }),
    },
    resolve: (query, root, args) => {
      return prisma.realWorldLocation.findUnique({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
);
