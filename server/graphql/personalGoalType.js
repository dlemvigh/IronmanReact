const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const database = require("./database");

const personalGoalType = new GraphQLObjectType({
  name: "PersonalGoal",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("User"),
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
    count: {
      type: GraphQLInt
    },
    dist: {
      type: GraphQLFloat
    },
    score: {
      type: GraphQLInt
    },
    priority: {
      type: GraphQLInt
    }
  })
});

module.exports = personalGoalType;
