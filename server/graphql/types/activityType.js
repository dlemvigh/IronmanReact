const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { connectionDefinitions, globalIdField } = require("graphql-relay");
const CustomGraphQLDateType = require("graphql-custom-datetype");

const database = require("../database");

const activityType = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Activity"),
    discipline: {
      type: require("./disciplineType"),
      resolve: obj => database.getDiscipline(obj.disciplineId)
    },
    disciplineId: {
      type: GraphQLID
    },
    disciplineName: {
      type: GraphQLString
    },
    distance: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    date: {
      type: CustomGraphQLDateType
    },
    week: {
      type: GraphQLInt
    },
    year: {
      type: GraphQLInt
    },
    weekyear: {
      type: GraphQLInt,
      resolve: obj => `${obj.year}${obj.week < 10 ? "0" : ""}${obj.week}`
    },
    user: {
      type: require("./userType"),
      resolve: obj => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    },
    syncLogId: {
      type: GraphQLFloat
    }
  })
});

const {
  connectionType: activityConnection,
  edgeType: activityEdge
} = connectionDefinitions({
  name: "Activity",
  nodeType: activityType
});

module.exports = {
  activityType,
  activityConnection,
  activityEdge
};
