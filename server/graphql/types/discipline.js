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

import ActivityModel from "../../models/activity";
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
        // activityConnection: {
        //     type: activityConnection.connectionType,
        //     args: connectionArgs,
        //     resolve (root, params, info, options) {
        //         const activities = ActivityModel
        //                 .find({disciplineId: root._id});
        //         return connectionFromPromisedArray(
        //             activities,
        //             params);
        //     }
        // }
    })
});

console.log("disc")

export default DisciplineType;
