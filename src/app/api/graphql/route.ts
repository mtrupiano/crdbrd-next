import type { NextApiRequest, NextApiResponse } from "next";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

const { handleRequest } = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: createContext,
  fetchAPI: { Response },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
