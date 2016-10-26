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
      DisciplineModel.findById(params.data.disciplineId).exec(),
      UserModel.findById(params.data.userId).exec()
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