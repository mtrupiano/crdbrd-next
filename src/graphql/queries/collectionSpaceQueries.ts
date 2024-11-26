import { builder } from "../builder";

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

builder.queryField("collectionSpace", (t) =>
  t.prismaField({
    type: "CollectionSpace",
    args: {
      id: t.arg({
        type: "String",
        description: "CollectionSpace database ID",
        required: true,
      }),
    },
    authScopes: {
      loggedInUser: true,
    },
    resolve: (query, root, args) => {
      return prisma.collectionSpace.findFirst({
        ...query,
        where: { id: args.id },
      });
    },
  }),
);
