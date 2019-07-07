const { GraphQLObjectType } = require("graphql");

const ensureLoginMutation = require("./ensureLoginMutation");
const setPersonalGoalsMutation = require("./setPersonalGoalsMutation");
const addSeasonMutation = require("./addSeasonMutation");
const addUserMutation = require("./addUserMutation");
const removeActivityMutation = require("./removeActivityMutation");
const removeUserMutation = require("./removeUserMutation");
const editActivityMutation = require("./editActivityMutation");
const addActivityMutation = require("./addActivityMutation");

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

module.exports = mutationType;
