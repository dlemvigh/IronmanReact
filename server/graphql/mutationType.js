import { GraphQLObjectType } from "graphql";

import addActivityMutation from './mutations/addActivityMutation';
import editActivityMutation from './mutations/editActivityMutation';
import removeActivityMutation from './mutations/removeActivityMutation';
import addUserMutation from './mutations/addUserMutation';
import addSeasonMutation from './mutations/addSeasonMutation';
import ensureLoginMutation from './mutations/ensureLoginMutation';
import setPersonalGoalsMutation from './mutations/setPersonalGoalsMutation';

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addActivity: addActivityMutation,
    editActivity: editActivityMutation,
    removeActivity: removeActivityMutation,
    addUser: addUserMutation,
    addSeason: addSeasonMutation,
    ensureLogin: ensureLoginMutation,
    setPersonalGoals: setPersonalGoalsMutation
  })
});

export default mutationType;