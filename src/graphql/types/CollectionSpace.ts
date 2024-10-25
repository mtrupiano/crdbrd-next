import { builder } from "../builder";
import { VISIBILITY } from "./Visibility";

builder.prismaObject("CollectionSpace", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    visibility: t.expose("visibility", { type: VISIBILITY }),
    userId: t.exposeInt("userId"),
    realWorldLocations: t.relation("realWorldLocations"),
    customCardAttributes: t.relation("customCardAttributes"),
  }),
});

builder.queryField("collectionsForUser", (t) =>
  t.prismaConnection({
    type: "CollectionSpace",
    cursor: "id",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      userId: t.arg({
        type: "Int",
        description: "User database ID",
      }),
    },
    resolve: async (query, root, args) => {
      return prisma.collectionSpace.findMany({
        ...query,
        where: { userId: args.userId },
      });
    },
  }),
);

builder.queryField("collections", (t) =>
  t.prismaConnection({
    type: "CollectionSpace",
    cursor: "id",
    resolve: (query) => {
      return prisma.collectionSpace.findMany({ ...query });
    },
  }),
);
