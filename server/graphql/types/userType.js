import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql";
import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField
} from "graphql-relay";

import { nodeInterface } from '../nodeInterface';
import { activityConnection } from './activityType';
import medalsType from './medalsType';
import personalGoalType from './personalGoalType';
import summaryType from './summaryType';
import database from '../database';

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("User"),
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    },
    activities: {
      type: activityConnection,
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(database.getActivities({userId: root._id}), args)
    },
    summary: {
      type: summaryType,
      args: {
        week: {
          name: "week",
          type: GraphQLInt
        },        
        year: {
          name: "year",
          type: GraphQLInt
        }        
      },
      resolve: (root, args) => {                
        return database.getWeekSummary(root._id, args.week, args.year);
      }
    },
    medals: {
      type: medalsType,
      resolve: (root) => {
        return database.getMedalsByUserId(root._id);
      }
    },
    personalGoals: {
      type: new GraphQLList(personalGoalType),
      resolve: (root) => {
        return database.getPersonalGoalsByUser(root._id);
      }
    }
  }),
  interfaces: () => [nodeInterface]
});

export default userType;