"use client";

import { from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { auth } from "./auth";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

export default function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
