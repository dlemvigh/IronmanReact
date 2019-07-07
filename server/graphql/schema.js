const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
  query: require("./queryType"),
  mutation: require("./mutationType")
});
