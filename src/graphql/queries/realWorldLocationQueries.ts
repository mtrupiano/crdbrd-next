import { builder } from "../builder";

builder.queryField("realWorldLocation", (t) =>
  t.prismaField({
    type: "RealWorldLocation",
    authScopes: {
      loggedInUser: true,
    },
    args: {
      id: t.arg({
        type: "String",
        description: "RealWorldLocation database ID",
        required: true,
      }),
    },
    resolve: (query, root, args) => {
      return prisma.realWorldLocation.findFirst({
        ...query,
        where: {
          id: args.id,
        },
      });
    },
  }),
);
