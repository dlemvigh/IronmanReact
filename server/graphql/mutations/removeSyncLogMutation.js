const { GraphQLNonNull, GraphQLFloat, GraphQLList } = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const removeSyncLogMutation = mutationWithClientMutationId({
  name: "RemoveSyncLog",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLFloat)
    }
  },
  outputFields: {
    activity: {
      type: require("../types/activityType").activityType,
      resolve: async obj => {
        return obj;
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
  mutateAndGetPayload: ({ id }) => {
    return database.addSyncLog(id);
  }
});

module.exports = removeSyncLogMutation;
