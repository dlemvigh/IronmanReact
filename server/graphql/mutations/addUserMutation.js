import {
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  mutationWithClientMutationId
} from "graphql-relay";

import database from '../database';
import storeType from '../types/storeType';
import userType from '../types/userType';

const addUserMutation = mutationWithClientMutationId({
  name: "AddUser",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (obj) => {
        return obj;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({name, username}) => {
    return database.addUser(name, username);
  }
});

export default addUserMutation;