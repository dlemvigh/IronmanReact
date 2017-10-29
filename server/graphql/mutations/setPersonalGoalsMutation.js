import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
} from "graphql";
import {
  mutationWithClientMutationId
} from "graphql-relay";

import database from '../database';
import userType from '../types/userType';

const personalGoalInputType = new GraphQLInputObjectType({
  name: "PersonalGoalInput",
  fields: () => ({
    disciplineId: { type: GraphQLString },
    count: { type: GraphQLInt },
    dist: { type: GraphQLFloat },
    score: { type: GraphQLInt }
  })
});

const setPersonalGoalsMutation = mutationWithClientMutationId({
  name: "SetPersonalGoals",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    goals: { type: new GraphQLList(personalGoalInputType) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (obj) => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({userId, goals}) => {
    return database.setPersonalGoals(userId, goals);
  }
});

export default setPersonalGoalsMutation;