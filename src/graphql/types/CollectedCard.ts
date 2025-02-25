import { builder } from "../builder";

builder.prismaObject("CollectedCard", {
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeID("userId"),
    multiverseId: t.exposeString("multiverseId"),
    locationId: t.exposeID("locationId"),
    collectionId: t.exposeID("collectionId"),
    attributes: t.relation("attributes"),
  }),
});
