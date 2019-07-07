const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} = require("graphql");
const {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField
} = require("graphql-relay");

const database = require("../database");

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("User"),
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    },
    activities: {
      type: require("./activityType").activityConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromPromisedArray(
          database.getActivities({
            userId: root._id
          }),
          args
        )
    },
    summary: {
      type: require("./summaryType"),
      args: {
        week: {
          name: "week",
          type: GraphQLInt
        },
        year: {
          name: "year",
          type: GraphQLInt
        }
      },
      resolve: (root, args) => {
        return database.getWeekSummary(root._id, args.week, args.year);
      }
    },
    medals: {
      type: require("./medalsType"),
      resolve: root => {
        return database.getMedalsByUserId(root._id);
      }
    },
    personalGoals: {
      type: new GraphQLList(require("./personalGoalType")),
      resolve: root => {
        return database.getPersonalGoalsByUser(root._id);
      }
    },
    syncActivityId: {
      type: GraphQLInt
    }
  })
});

module.exports = userType;
