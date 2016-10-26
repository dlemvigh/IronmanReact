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
    const discipline = DisciplineModel.findById(params.data.disciplineId).exec();
    const user = UserModel.findById(params.data.userId).exec()

    Promise.all([discipline, user]).then(([d,u]) => {
      const obj = {
        ...params.data,
        disciplineName: d.name,
        userName: u.name,
        unit: d.unit,
        score: d.score * params.data.distance
      };
      console.log("act", obj);
      const activity = new ActivityModel(obj).save((err) => console.log("save", err));
    })
    // const blogPostModel = new BlogPostModel(params.data);
    // const newBlogPost = await blogPostModel.save();

    // if (!newBlogPost) {
    //   throw new Error('Error adding new activity');
    // }

    return true;
  }
};