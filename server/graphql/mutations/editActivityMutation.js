import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
} from "graphql";
import {
  mutationWithClientMutationId,
} from "graphql-relay";

import database from '../database';
import activityType from '../types/activityType';
import medalsType from '../types/medalsType';
import storeType from '../types/storeType';
import userType from '../types/userType';

const editActivityMutation = mutationWithClientMutationId({
  name: "EditActivity",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    disciplineId: { type: new GraphQLNonNull(GraphQLString) },
    distance: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    activity: {
      type: activityType,
      resolve: async (obj) => obj
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

  mutateAndGetPayload: ({ id, userId, disciplineId, distance, date }) => {
    return database.editActivity(id, userId, disciplineId, distance, date); 
  }
});

export default editActivityMutation;