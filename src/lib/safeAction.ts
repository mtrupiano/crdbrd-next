import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
export const safeActionClient = createSafeActionClient();
export const authSafeActionClient = safeActionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Not authorized; no user session found");
  }
  return next({
    ctx: {
      userId: session.user?.id,
    },
  });
});
