import { HttpLink } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        collectionSpaces: relayStylePagination(),
        adminAllCollectionSpaces: relayStylePagination(),
        adminAllUsers: relayStylePagination(),
      },
    },
  },
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    link: httpLink,
    cache,
  });
});
