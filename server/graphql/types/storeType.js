import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface } from '../nodeInterface';
import disciplineType from './disciplineType';
import seasonType from './seasonType';
import summaryType from './summaryType';
import userType from './userType';
import database from '../database';

const storeType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    id: globalIdField("Store"),
    echo: {
      type: GraphQLString,
      resolve: () => "hello"
    },
    disciplines: {
      type: new GraphQLList(disciplineType),
      resolve: () => database.getDisciplines()
    },
    users: {
      type: new GraphQLList(userType),
      resolve: () => database.getUsers()
    },
    currentSeason: {
      type: seasonType,
      resolve: () => {
        return database.getCurrentSeason();
      }
    },
    allSeasons: {
      type: new GraphQLList(seasonType),
      resolve: () => {
        return database.getSeasons();
      }
    },
    allSummaries: {
      type: new GraphQLList(summaryType),
      resolve: () => {
        return database.getAllWeekSummaries();
      }
    },
    summary: {
      type: new GraphQLList(summaryType),
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
        return database.getAllSummaries(args.week, args.year);
      },
    },
  }),
  interfaces: () => [nodeInterface]
});

export default storeType;
