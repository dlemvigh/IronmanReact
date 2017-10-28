import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat
} from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface } from '../nodeInterface';
import userType from './userType';
import database from '../database';

const summaryType = new GraphQLObjectType({
  name: "Summary",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("Summary"),
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
    score: {
      type: GraphQLFloat
    },
    week: {
      type: GraphQLInt
    },
    year: {
      type: GraphQLInt

    }
  }),
  interfaces: () => [nodeInterface]
});

export default summaryType;