import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
} from "graphql";
import {
  offsetToCursor,
  mutationWithClientMutationId,
} from "graphql-relay";

import database from '../database';
import activityType, { activityEdge } from '../types/activityType';
import medalsType from '../types/medalsType';
import storeType from '../types/storeType';
import userType from '../types/userType';

const addActivityMutation = mutationWithClientMutationId({
  name: "AddActivity",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    disciplineId: { type: new GraphQLNonNull(GraphQLString) },
    distance: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    activity: {
      type: activityType,
      resolve: (obj) => {
        return obj;
      }
    },
    activityEdge: {
      type: activityEdge,
      resolve: async (obj) => {
        const activities = await database.getActivities({userId: obj.userId});
        const index = activities.findIndex(x => x._id === obj._id);
        const cursorIndex = offsetToCursor(index);
        return { node: obj, cursor: cursorIndex };
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

  mutateAndGetPayload: ({ userId, disciplineId, distance, date }) => {
    return database.addActivity(userId, disciplineId, distance, date); 
  }
});

export default addActivityMutation;