const { GraphQLNonNull, GraphQLString } = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const ensureLoginMutation = mutationWithClientMutationId({
  name: "EnsureLogin",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    provider: {
      type: new GraphQLNonNull(GraphQLString)
    },
    providerUserId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: require("../types/userType"),
      resolve: obj => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({ username, provider, providerUserId }) => {
    return database.ensureLogin(username, provider, providerUserId);
  }
});

module.exports = ensureLoginMutation;
