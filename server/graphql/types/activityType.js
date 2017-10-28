import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} from "graphql";
import { 
  globalIdField,
  connectionDefinitions 
} from "graphql-relay";
import CustomGraphQLDateType from "graphql-custom-datetype";

import { nodeInterface } from '../nodeInterface';
import disciplineType from './disciplineType';
import userType from './userType';
import database from '../database';

const activityType = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("Activity"),
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
    distance: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    date: {
      type: CustomGraphQLDateType  
    },
    week: {
      type: GraphQLInt
    },
    year: {
      type: GraphQLInt
    },
    user: {
      type: userType,
      resolve: (obj) => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
});

const { 
  connectionType: activityConnection, 
  edgeType: activityEdge 
} = connectionDefinitions({ name: "Activity", nodeType: activityType });

export default activityType;
export { activityConnection, activityEdge }