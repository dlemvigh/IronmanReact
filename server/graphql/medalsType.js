const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const medalsType = new GraphQLObjectType({
  name: "Medals",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Medals"),
    gold: {
      type: GraphQLInt
    },
    goldWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    silver: {
      type: GraphQLInt
    },
    silverWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    bronze: {
      type: GraphQLInt
    },
    bronzeWeeks: {
      type: new GraphQLList(GraphQLInt)
    }
  })
});

module.exports = medalsType;
