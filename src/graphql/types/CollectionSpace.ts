import { builder } from "../builder";
import { VISIBILITY } from "./Visibility";

builder.prismaObject("CollectionSpace", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    visibility: t.expose("visibility", { type: VISIBILITY }),
    userId: t.exposeID("userId"),
    realWorldLocations: t.relation("realWorldLocations"),
    customCardAttributes: t.relation("customCardAttributes"),
    archivedAt: t.expose("archivedAt", { type: "Date" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});