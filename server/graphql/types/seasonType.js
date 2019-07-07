const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const seasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Season"),
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    from: {
      type: GraphQLInt
    },
    to: {
      type: GraphQLInt
    }
  })
});

module.exports = seasonType;
