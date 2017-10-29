import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  mutationWithClientMutationId
} from "graphql-relay";

import database from '../database';
import userType from '../types/userType';

const ensureLoginMutation = mutationWithClientMutationId({
  name: "EnsureLogin",
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString)},
    provider: { type: new GraphQLNonNull(GraphQLString)},
    providerUserId: { type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (obj) => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({username, provider, providerUserId}) => {
    return database.ensureLogin(username, provider, providerUserId);
  }
});

export default ensureLoginMutation;