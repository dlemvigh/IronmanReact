const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const addSeasonMutation = mutationWithClientMutationId({
  name: "AddSeason",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    from: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    to: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  outputFields: {
    season: {
      type: require("../types/seasonType"),
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
  mutateAndGetPayload: ({ name, url, from, to }) => {
    return database.addSeason(name, url, from, to);
  }
});

module.exports = addSeasonMutation;
