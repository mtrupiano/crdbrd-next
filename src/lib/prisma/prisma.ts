import { Prisma, PrismaClient } from "@prisma/client";

const filterArchived = Prisma.defineExtension({
  name: "filterArchived",
  query: {
    $allModels: {
      async $allOperations({ operation, args, query }) {
        if (
          operation === "findUnique" ||
          operation === "findFirst" ||
          operation === "findMany"
        ) {
          args.where = { ...args.where, archivedAt: null };
          return query(args);
        }
        return query(args);
      },
    },
  },
});

const client = new PrismaClient().$extends(filterArchived);

declare global {
  // eslint-disable-next-line no-var
  var prisma: typeof client; // var needed when declaring global
}

if (process.env.NODE_ENV === "production") {
  prisma = client;
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = client;
  }
  prisma = globalThis.prisma;
}

export default prisma;
