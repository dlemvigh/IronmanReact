import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import { getConfig } from "../shared/config";

const config = getConfig();
const endpoint = `http://localhost:${config.port}/graphql`;

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: endpoint,
  cache
});
