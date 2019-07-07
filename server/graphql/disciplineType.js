const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const disciplineType = new GraphQLObjectType({
  name: "Discipline",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Discipline"),
    name: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    }
  })
});

module.exports = disciplineType;
