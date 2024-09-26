import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        console.log(credentials);
        
        return {
          id: 1,
          email: "test@test.test",
        }
      }
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);