import {
  GraphQLSchema,
} from "graphql";

import queryType from './queryType';
import mutationType from './mutationType';

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

