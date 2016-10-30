import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';
import {
  connectionArgs,
  connectionFromPromisedArray
} from "graphql-relay";

import getProjection from '../get-projection';

const DisciplineType = new GraphQLObjectType({
    name: 'Discipline',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (root) => root._id
        },
        name: {
            type: GraphQLString
        },
        score: {
            type: GraphQLFloat
        },
        unit: {
            type: GraphQLString
        },
    })
});

export default DisciplineType;
