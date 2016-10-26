import {Types} from 'mongoose';
import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import activityType from "../../types/activity";
import getProjection from '../../get-projection';
import ActivityModel from "../../../models/activity";

export default {
    type: activityType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, options) {
        // const projection = getProjection(options.fieldASTs[0]);
        return ActivityModel
            .findById(params.id)
            // .select(projection)
            .exec();
    }
};