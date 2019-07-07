const ensureLoginMutation = require("./ensureLoginMutation");
const setPersonalGoalsMutation = require("./setPersonalGoalsMutation");
const addSeasonMutation = require("./addSeasonMutation");
const addUserMutation = require("./addUserMutation");
const removeActivityMutation = require("./removeActivityMutation");
const removeUserMutation = require("./removeUserMutation");
const editActivityMutation = require("./editActivityMutation");
const addActivityMutation = require("./addActivityMutation");

const storeType = require("./storeType");
const stravaType = require("./stravaType");
const userType = require("./userType");
const seasonType = require("./seasonType");

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const database = require("./database");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    store: {
      type: storeType,
      resolve: () => database.getStore()
    },
    season: {
      type: seasonType,
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
      type: userType,
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
      type: stravaType,
      resolve: () => true
    }
  })
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addActivity: addActivityMutation,
    editActivity: editActivityMutation,
    removeActivity: removeActivityMutation,
    addUser: addUserMutation,
    removeUser: removeUserMutation,
    addSeason: addSeasonMutation,
    ensureLogin: ensureLoginMutation,
    setPersonalGoals: setPersonalGoalsMutation
  })
});

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
