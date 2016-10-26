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
    type: new GraphQLList(activityType),
    args: {},
    resolve (root, params, info, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return ActivityModel
            .find()
            .select(projection)
            .exec();
    }
};