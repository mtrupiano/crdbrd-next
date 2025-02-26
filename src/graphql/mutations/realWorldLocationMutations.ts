import { builder } from "../builder";

builder.mutationField("updateLocationMutation", (t) =>
  t.prismaField({
    type: "RealWorldLocation",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      name: t.arg({ type: "String" }),
      description: t.arg({ type: "String" }),
      id: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, args) => {
      const { id, name, description } = args;
      return prisma.realWorldLocation.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      });
    },
  }),
);

builder.mutationField("createLocationMutation", (t) =>
  t.prismaField({
    type: "RealWorldLocation",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      name: t.arg({ type: "String", required: true }),
      description: t.arg({ type: "String", required: false }),
      collectionSpaceId: t.arg({ type: "String", required: true }),
    },
    resolve: async (query, root, args, { user }) => {
      return await prisma.realWorldLocation.create({
        data: {
          name: args.name,
          description: args.description,
          collectionSpaceId: args.collectionSpaceId,
          userId: user.id,
        },
      });
    },
  }),
);
