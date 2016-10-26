import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';
import CustomGraphQLDateType from "graphql-custom-datetype"

export default new GraphQLInputObjectType({
    name: 'ActivityInput',
    fields: {
        disciplineId: {
            type: GraphQLID
        },
        distance: {
            type: GraphQLFloat
        },
        date: {
            type: GraphQLString  
        },
        userId: {
            type: GraphQLID
        }        
    }
});