import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from '../nodeInterface';

const seasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Season"),
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    from: {
      type: GraphQLInt
    },
    to: {
      type: GraphQLInt
    }
  }),
  interfaces: () => [nodeInterface]
});

export default seasonType;