import {
  GraphQLObjectType,
  GraphQLString
} from "graphql";

import seasonType from './types/seasonType';
import storeType from './types/storeType';
import userType from './types/userType';
import database from './database';
import { nodeField } from './nodeInterface';

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
      resolve (root, params) {
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
      resolve (root, params) {
        if (params.id) {
          return database.getUser(params.id);
        }
        if (params.username) {
          return database.getUserByUsername(params.username);
        }              
        throw new Error("No arguments supplied to get user"); 
      }
    },
    node: nodeField
  })
});

export default queryType;
