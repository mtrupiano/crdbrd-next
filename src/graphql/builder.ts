import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import AuthScopePlugin from "@pothos/plugin-scope-auth";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { createContext } from "./context";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof createContext>;
  AuthScopes: {
    public: boolean;
    loggedInUser: boolean;
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin, AuthScopePlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
  scopeAuth: {
    authScopes: async () => ({
      public: true,
      loggedInUser: async () => {
        const session = await auth();
        return !!session;
      },
    }),
  },
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
