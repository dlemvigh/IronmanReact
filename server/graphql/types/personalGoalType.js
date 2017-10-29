import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface } from '../nodeInterface';
import disciplineType from './disciplineType';
import userType from './userType';
import database from '../database';

const personalGoalType = new GraphQLObjectType({
  name: "PersonalGoal",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("User"),
    user: {
      type: userType,
      resolve: (obj) => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    },
    discipline: {
      type: disciplineType,
      resolve: (obj) => database.getDiscipline(obj.disciplineId)
    },
    disciplineId: {
      type: GraphQLID
    },
    disciplineName: {
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
    },
    priority: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
});

export default personalGoalType;