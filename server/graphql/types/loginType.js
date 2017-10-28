import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";

import { nodeInterface } from '../nodeInterface';
import userType from './userType';
import database from '../database';

const loginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    id: globalIdField("User"),
    user: {
      type: userType,
      resolve: (obj) => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    provider: {
      type: GraphQLString
    },
    providerUserId: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
});

export default loginType;
