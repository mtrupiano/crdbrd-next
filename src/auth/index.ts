import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: {
        email: string;
        password: string;
      }): Promise<User | null> {
        const response = await fetch(
          `${process.env.KTOR_API_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(await response.json());

        return {
          id: 1,
          email: "test@test.test",
        };
      },
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