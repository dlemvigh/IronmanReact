import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  mutationWithClientMutationId,
  toGlobalId
} from "graphql-relay";

import database from '../database';
import medalsType from '../types/medalsType';
import storeType from '../types/storeType';
import userType from '../types/userType';

const removeActivityMutation = mutationWithClientMutationId({
  name: "RemoveActivity",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    removedActivityId: {
      type: GraphQLString,
      resolve: (obj) => {
        const globalId = toGlobalId("Activity", obj._id);
        return globalId;
      } 
    },
    user: {
      type: userType,
      resolve: async (obj) => {
        return await database.getUser(obj.userId);
      }
    },
    medals: {
      type: new GraphQLList(medalsType),
      resolve: async () => {
        return await database.getAllMedals();
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({id}) => {
    return database.removeActivity(id);
  }
});

export default removeActivityMutation;