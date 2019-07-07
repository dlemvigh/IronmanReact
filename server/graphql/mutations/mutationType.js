const { GraphQLObjectType } = require("graphql");

const ensureLoginMutation = require("./ensureLoginMutation");
const addSeasonMutation = require("./addSeasonMutation");
const removeUserMutation = require("./removeUserMutation");
const addUserMutation = require("./addUserMutation");

const setPersonalGoalsMutation = require("./setPersonalGoalsMutation");
const removeActivityMutation = require("./removeActivityMutation");
const editActivityMutation = require("./editActivityMutation");
const addActivityMutation = require("./addActivityMutation");

const addSyncLogMutation = require("./addSyncLogMutation");

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
    setPersonalGoals: setPersonalGoalsMutation,
    addSyncLog: addSyncLogMutation
  })
});

module.exports = mutationType;
