import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    email: t.exposeString("email"),
    role: t.expose("role", { type: ROLE }),
    collectionSpaces: t.relation("collections"),
  }),
});

const ROLE = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    description: "Single user by database ID or email",
    args: {
      email: t.arg({
        type: "String",
        description: "User email",
      }),
      id: t.arg({
        type: "Int",
        description: "User database ID",
      }),
    },
    resolve: (query, root, args) =>
      prisma.user.findUnique({
        where: { id: args.id, email: args.email },
      }),
  }),
);

builder.queryField("users", (t) =>
  t.prismaConnection({
    type: "User",
    cursor: "id",
    resolve: (query) => {
      return prisma.user.findMany({ ...query });
    },
  }),
);
