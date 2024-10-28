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
    archivedAt: t.expose("archivedAt", { type: "Date" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});

builder.mutationField("createCollectionMutation", (t) =>
  t.prismaField({
    type: "CollectionSpace",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      name: t.arg({
        type: "String",
        required: true,
      }),
      description: t.arg({
        type: "String",
        required: false,
      }),
    },
    resolve: (query, root, args, { user }) => {
      const userId = parseInt(user.id);
      return prisma.collectionSpace.create({
        ...query,
        data: {
          ...args,
          userId,
        },
      });
    },
  }),
);

builder.queryField("collectionSpaces", (t) =>
  t.prismaConnection({
    type: "CollectionSpace",
    cursor: "id",
    authScopes: {
      loggedInUser: true,
    },
    resolve: async (query, root, args, context) => {
      return prisma.collectionSpace.findMany({
        ...query,
        where: { userId: parseInt((await context).user.id) },
      });
    },
  }),
);

builder.queryField("adminAllCollectionSpaces", (t) =>
  t.prismaConnection({
    type: "CollectionSpace",
    authScopes: {
      loggedInUser: true,
      loggedInAdmin: true,
    },
    cursor: "id",
    resolve: (query) => {
      return prisma.collectionSpace.findMany({ ...query });
    },
  }),
);
