const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
  query: require("./types/queryType"),
  mutation: require("./mutations/mutationType")
});
