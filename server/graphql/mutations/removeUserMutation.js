const { GraphQLNonNull, GraphQLString } = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const removeUserMutation = mutationWithClientMutationId({
  name: "RemoveUser",
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: require("../types/userType"),
      resolve: obj => {
        return obj;
      }
    },
    store: {
      type: require("../types/storeType"),
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ username }) => {
    return database.removeUser(username);
  }
});

module.exports = removeUserMutation;
