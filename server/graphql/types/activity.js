import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import CustomGraphQLDateType from "graphql-custom-datetype"

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (root) => root._id
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
        userId: {
            type: GraphQLID
        },
        userName: {
            type: GraphQLString
        }
    })
});

export default ActivityType;