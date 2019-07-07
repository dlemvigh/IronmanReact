const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const database = require("../database");

const summaryType = new GraphQLObjectType({
  name: "Summary",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Summary"),
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
    score: {
      type: GraphQLFloat
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
    }
  })
});

module.exports = summaryType;
