import { builder } from "../builder";

builder.prismaObject("CollectedCard", {
  fields: (t) => ({
    id: t.exposeID("id"),
    multiverseId: t.exposeString("multiverseId"),
    attributes: t.relation("attributes"),
    user: t.relation("user"),
    userId: t.exposeID("userId"),
    collectionSpace: t.relation("collectionSpace"),
    collectionSpaceId: t.exposeID("collectionSpaceId"),
    location: t.relation("realWorldLocation"),
    locationId: t.exposeID("locationId"),
  }),
});
