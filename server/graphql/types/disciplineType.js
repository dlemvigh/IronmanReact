import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from '../nodeInterface';

const disciplineType = new GraphQLObjectType({
  name: "Discipline",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("Discipline"),
    name: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    },
  }),
  interfaces: () => [nodeInterface]
});

export default disciplineType;