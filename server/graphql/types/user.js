import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from "graphql-relay";

import activityType from "./activity"
import ActivityModel from "../../models/activity";
import getProjection from '../get-projection';

const activityConnection = connectionDefinitions({
    name: 'Activity',
    nodeType: activityType
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (root) => root._id
        },
        name: {
            type: GraphQLString
        },
        facebookId: {
            type: GraphQLString
        },
        activityConnection: {
            type: activityConnection.connectionType,
            args: connectionArgs,
            resolve (root, params, info, options) {
                const activities = ActivityModel
                        .find({userId: root._id});
                return connectionFromPromisedArray(
                    activities,
                    params);
            }
        }
    })
});

console.log("user")

export default UserType;