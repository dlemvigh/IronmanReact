const { GraphQLList, GraphQLNonNull, GraphQLString } = require("graphql");
const { toGlobalId, mutationWithClientMutationId } = require("graphql-relay");

const database = require("./database");

const removeActivityMutation = mutationWithClientMutationId({
  name: "RemoveActivity",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    removedActivityId: {
      type: GraphQLString,
      resolve: obj => {
        const globalId = toGlobalId("Activity", obj._id);
        return globalId;
      }
    },
    activity: {
      type: require("./activityType").activityType,
      resolve: activity => activity
    },
    summary: {
      type: new GraphQLList(require("./summaryType")),
      resolve: activity => {
        return database.getAllSummaries(activity.week, activity.year);
      }
    },
    user: {
      type: require("./userType"),
      resolve: obj => {
        return database.getUser(obj.userId);
      }
    },
    medals: {
      type: new GraphQLList(require("./medalsType")),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    store: {
      type: require("./storeType"),
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ id }) => {
    return database.removeActivity(id);
  }
});

module.exports = removeActivityMutation;
