const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat
} = require("graphql");
const {
  offsetToCursor,
  mutationWithClientMutationId
} = require("graphql-relay");

const database = require("../database");

const addActivityMutation = mutationWithClientMutationId({
  name: "AddActivity",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    disciplineId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    distance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    activity: {
      type: require("../types/activityType").activityType,
      resolve: async obj => {
        return obj;
      }
    },
    activityEdge: {
      type: require("../types/activityType").activityEdge,
      resolve: async obj => {
        const activities = await database.getActivities({
          userId: obj.userId
        });
        const index = activities.findIndex(x => x._id === obj._id);
        const cursorIndex = offsetToCursor(index);
        return {
          node: obj,
          cursor: cursorIndex
        };
      }
    },
    user: {
      type: require("../types/userType"),
      resolve: obj => {
        return database.getUser(obj.userId);
      }
    },
    medals: {
      type: new GraphQLList(require("../types/medalsType")),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    summary: {
      type: new GraphQLList(require("../types/summaryType")),
      resolve: async obj => {
        const summary = await database.getAllSummaries(obj.week, obj.year);
        return summary;
      }
    },
    store: {
      type: require("../types/storeType"),
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ userId, disciplineId, distance, date }) => {
    return database.addActivity(userId, disciplineId, distance, date);
  }
});

module.exports = addActivityMutation;
