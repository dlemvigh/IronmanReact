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

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: () => '42'
        }
    })
});

export default StoreType;
