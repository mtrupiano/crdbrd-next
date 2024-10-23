import { builder } from "../builder";
export const VISIBILITY = builder.enumType("Visibility", {
  values: ["PRIVATE", "UNLISTED", "PUBLIC"] as const,
});
