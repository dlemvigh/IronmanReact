const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const { mutationWithClientMutationId } = require("graphql-relay");

const database = require("../database");

const personalGoalInputType = new GraphQLInputObjectType({
  name: "PersonalGoalInput",
  fields: () => ({
    disciplineId: {
      type: GraphQLString
    },
    count: {
      type: GraphQLInt
    },
    dist: {
      type: GraphQLFloat
    },
    score: {
      type: GraphQLInt
    }
  })
});
const setPersonalGoalsMutation = mutationWithClientMutationId({
  name: "SetPersonalGoals",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    goals: {
      type: new GraphQLList(personalGoalInputType)
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
  mutateAndGetPayload: ({ userId, goals }) => {
    return database.setPersonalGoals(userId, goals);
  }
});

module.exports = setPersonalGoalsMutation;
