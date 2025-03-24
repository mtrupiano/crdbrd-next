import { Prisma, PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  const prisma: PrismaClient;
}

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

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient().$extends(filterArchived);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends(filterArchived);
  }
  prisma = global.prisma;
}

export default prisma;
