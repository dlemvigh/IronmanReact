import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Discipline',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        score: {
            type: GraphQLFloat
        },
        unit: {
            type: GraphQLString
        }
    }
});