import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
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
});

export default apolloClient;
