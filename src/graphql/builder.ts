import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import AuthScopePlugin from "@pothos/plugin-scope-auth";
import { DateTimeResolver } from "graphql-scalars";
import prisma from "@/lib/prisma/prisma";
import { auth } from "@/lib/auth";
import { createContext } from "./context";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof createContext>;
  AuthScopes: {
    public: boolean;
    loggedInUser: boolean;
  };
}>({
  plugins: [AuthScopePlugin, PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
  scopeAuth: {
    authScopes: async () => ({
      public: true,
      loggedInUser: async () => !!(await auth()),
      loggedInAdmin: () => {
        // TODO: implement user role check
        return true;
      },
    }),
  },
});

// TODO: Move this date type into 'types' directory
builder.addScalarType("Date", DateTimeResolver, {});

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
