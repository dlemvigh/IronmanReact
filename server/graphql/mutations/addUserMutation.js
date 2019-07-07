const { GraphQLNonNull, GraphQLString } = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const addUserMutation = mutationWithClientMutationId({
  name: "AddUser",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    }
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
  mutateAndGetPayload: ({ name, username }) => {
    return database.addUser(name, username);
  }
});

module.exports = addUserMutation;
