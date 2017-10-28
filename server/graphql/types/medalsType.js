import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from '../nodeInterface';

const medalsType = new GraphQLObjectType({
  name: "Medals",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Medals"),
    gold: {
      type: GraphQLInt
    },
    goldWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    silver: {
      type: GraphQLInt
    },
    silverWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    bronze: {
      type: GraphQLInt
    },
    bronzeWeeks: {
      type: new GraphQLList(GraphQLInt)
    }
  }),
  interfaces: () => [nodeInterface]
}); 

export default medalsType;