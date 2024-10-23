import { builder } from "../builder";

builder.prismaObject("CustomCardAttribute", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    value: t.exposeString("value"),
    cardsWithAttribute: t.relation("cardsWithAttribute"),
    collectionSpaceId: t.exposeID("collectionSpaceId"),
  }),
});

builder.queryField("customCardAttributes", (t) =>
  t.prismaConnection({
    type: "CustomCardAttribute",
    cursor: "id",
    resolve: (query) => {
      return prisma.customCardAttribute.findMany({ ...query });
    },
  }),
);
