import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import activityInputType from "../../types/activity-input";
import ActivityModel from "../../../models/activity";
import DisciplineModel from "../../../models/discipline";
import UserModel from "../../../models/user";

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(activityInputType)
    }
  },
  async resolve (root, params, options) {
    const [discipline, user] = await Promise.all([
      DisciplineModel.findById(params.data.disciplineId).select({name: 1, score: 1, unit: 1}).exec(),
      UserModel.findById(params.data.userId).select({name: 1}).exec()
    ]);

    const activity = new ActivityModel({
      ...params.data,
      disciplineName: discipline.name,
      userName: user.name,
      unit: discipline.unit,
      score: discipline.score * params.data.distance
    });

    const newActivity = await activity.save();
    if (!newActivity){
      throw new Error('Error adding new activity');
    }

    return true;
  }
};