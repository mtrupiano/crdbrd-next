import { builder } from "../builder";

builder.mutationField("createCollectionMutation", (t) =>
  t.prismaField({
    type: "CollectionSpace",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      name: t.arg({
        type: "String",
        description: "Name of the new collection space.",
        required: true,
      }),
      description: t.arg({
        type: "String",
        description: "Short description of the collection space.",
        required: false,
      }),
    },
    resolve: (query, root, args, { user }) => {
      return prisma.collectionSpace.create({
        ...query,
        data: {
          ...args,
          userId: user.id,
        },
      });
    },
  }),
);
