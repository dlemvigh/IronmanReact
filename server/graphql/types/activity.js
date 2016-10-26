import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';
import CustomGraphQLDateType from "graphql-custom-datetype"

export default new GraphQLObjectType({
    name: 'Activity',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
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
        },
        
    }
});