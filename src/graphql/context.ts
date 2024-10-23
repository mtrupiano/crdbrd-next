import { auth } from "@/auth";

export async function createContext() {
  const session = await auth();

  if (!session) return {};

  const { user, accessToken } = session;

  return {
    user,
    accessToken,
  };
}
