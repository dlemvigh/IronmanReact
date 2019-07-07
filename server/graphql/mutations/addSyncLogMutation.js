const {
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const addSyncLogMutation = mutationWithClientMutationId({
  name: "AddSyncLog",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
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
  mutateAndGetPayload: ({ id, userId }) => {
    return database.addSyncLog(id, userId);
  }
});

module.exports = addSyncLogMutation;
