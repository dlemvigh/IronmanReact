import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} from "graphql";
import {
  offsetToCursor,
  toGlobalId,
  mutationWithClientMutationId,
} from "graphql-relay";

import database from "./database";

import activityType, { activityEdge } from './types/activityType';
import medalsType from './types/medalsType';
import seasonType from './types/seasonType';
import userType from './types/userType';

import storeType from './types/storeType';
import queryType from './types/queryType';

const addActivityMutation = mutationWithClientMutationId({
  name: "AddActivity",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    disciplineId: { type: new GraphQLNonNull(GraphQLString) },
    distance: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
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

const addSeasonMutation = mutationWithClientMutationId({
  name: "AddSeason",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString)},
    url: { type: new GraphQLNonNull(GraphQLString)},
    from: { type: new GraphQLNonNull(GraphQLInt)},
    to: { type: new GraphQLNonNull(GraphQLInt)}
  },
  outputFields: {
    season: {
      type: seasonType,
      resolve: (obj) => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({name, url, from, to}) => {
    return database.addSeason(name, url, from, to);
  }
});

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

const personalGoalInputType = new GraphQLInputObjectType({
  name: "PersonalGoalInput",
  fields: () => ({
    disciplineId: { type: GraphQLString },
    count: { type: GraphQLInt },
    dist: { type: GraphQLFloat },
    score: { type: GraphQLInt }
  })
});

const setPersonalGoalsMutation = mutationWithClientMutationId({
  name: "SetPersonalGoals",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    goals: { type: new GraphQLList(personalGoalInputType) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (obj) => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({userId, goals}) => {
    return database.setPersonalGoals(userId, goals);
  }
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addActivity: addActivityMutation,
    editActivity: editActivityMutation,
    removeActivity: removeActivityMutation,
    addUser: addUserMutation,
    addSeason: addSeasonMutation,
    ensureLogin: ensureLoginMutation,
    setPersonalGoals: setPersonalGoalsMutation
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

