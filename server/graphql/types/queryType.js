const { GraphQLObjectType, GraphQLString } = require("graphql");

const database = require("../database");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    store: {
      type: require("./storeType"),
      resolve: () => database.getStore()
    },
    season: {
      type: require("./seasonType"),
      args: {
        id: {
          name: "id",
          type: GraphQLString
        }
      },
      resolve(root, params) {
        return database.getSeason(params.id);
      }
    },
    user: {
      type: require("./userType"),
      args: {
        id: {
          name: "id",
          type: GraphQLString
        },
        username: {
          name: "username",
          type: GraphQLString
        }
      },
      resolve(root, params) {
        if (params.id) {
          return database.getUser(params.id);
        }
        if (params.username) {
          return database.getUserByUsername(params.username);
        }
        throw new Error("No arguments supplied to get user");
      }
    },
    strava: {
      type: require("./stravaType"),
      resolve: () => true
    }
  })
});

module.exports = queryType;
