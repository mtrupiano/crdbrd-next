import { builder } from "../builder";

builder.prismaObject("AttributesOnCards", {
  fields: (t) => ({
    attributeId: t.exposeID("attributeId"),
    cardId: t.exposeID("cardId"),
    attribute: t.relation("attribute"),
  }),
});

builder.queryField("attributesOnCards", (t) =>
  t.prismaConnection({
    type: "AttributesOnCards",
    cursor: "cardId_attributeId",
    resolve: (query) => {
      return prisma.collectionSpace.findMany({ ...query });
    },
  }),
);
