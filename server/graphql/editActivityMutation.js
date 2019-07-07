const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat
} = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("./database");

const editActivityMutation = mutationWithClientMutationId({
  name: "EditActivity",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
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
      type: require("./activityType").activityType,
      resolve: async ({ newActivity }) => newActivity
    },
    activityPrev: {
      type: require("./activityType").activityType,
      resolve: async ({ oldActivity }) => oldActivity
    },
    user: {
      type: require("./userType"),
      resolve: ({ newActivity }) => {
        return database.getUser(newActivity.userId);
      }
    },
    medals: {
      type: new GraphQLList(require("./medalsType")),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    summary: {
      type: new GraphQLList(require("./summaryType")),
      resolve: async ({ newActivity }) => {
        const summary = await database.getAllSummaries(
          newActivity.week,
          newActivity.year
        );
        return summary;
      }
    },
    summaryPrev: {
      type: new GraphQLList(require("./summaryType")),
      resolve: async ({ oldActivity }) => {
        const summary = await database.getAllSummaries(
          oldActivity.week,
          oldActivity.year
        );
        return summary;
      }
    },
    store: {
      type: require("./storeType"),
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ id, userId, disciplineId, distance, date }) => {
    return database.editActivity(id, userId, disciplineId, distance, date);
  }
});

module.exports = editActivityMutation;
