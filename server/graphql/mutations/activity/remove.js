import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import activityType from "../../types/activity";
import getProjection from '../../get-projection';
import ActivityModel from "../../../models/activity";

export default {
  type: activityType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const removedActivity = await ActivityModel
      .findByIdAndRemove(params._id)
      .exec();

    if (!removedActivity) {
      throw new Error('Error removing activity');
    }

    return removedActivity;
  }
};