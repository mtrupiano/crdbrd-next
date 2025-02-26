import { builder } from "../builder";
import { VISIBILITY } from "./Visibility";

builder.prismaObject("RealWorldLocation", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    locationType: t.expose("locationType", { type: LOCATION_TYPE }),
    collectionSpaceId: t.exposeID("collectionSpaceId"),
    collectionSpace: t.relation("collectionSpace"),
    user: t.relation("user"),
    visibility: t.expose("visibility", { type: VISIBILITY }),
    cards: t.relation("cards"),
    archivedAt: t.expose("archivedAt", { type: "Date" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    userId: t.exposeID("userId"),
  }),
});

const LOCATION_TYPE = builder.enumType("RealWorldLocationType", {
  values: ["BINDER", "DECK", "CUBE"] as const,
});
