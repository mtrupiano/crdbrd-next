"use client";

import { HttpLink } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            collectionSpaces: relayStylePagination(),
            adminAllCollectionSpaces: relayStylePagination(),
            adminAllUsers: relayStylePagination(),
          },
        },
      },
    }),
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
