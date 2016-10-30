import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import activityInputType from "../../types/activity-input";
import activityConnection from "../../types/activityConnection";
import ActivityModel from "../../../models/activity";
import DisciplineModel from "../../../models/discipline";
import UserModel from "../../../models/user";

async function resolveAddActivity(params) {
    const [discipline, user] = await Promise.all([
      DisciplineModel.findById(params.disciplineId).select({name: 1, score: 1, unit: 1}).exec(),
      UserModel.findById(params.userId).select({name: 1}).exec()
    ]);

    const activity = new ActivityModel({
      ...params,
      disciplineName: discipline.name,
      userName: user.name,
      unit: discipline.unit,
      score: discipline.score * params.distance
    });

    const newActivity = await activity.save();
    if (!newActivity){
      throw new Error('Error adding new activity');
    }

    return newActivity;  
}

const add = {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(activityInputType)
    }
  },
  async resolve (root, params, options) {
    const newActivity = await resolveAddActivity(params.data);
    return newActivity;
  }
};


const addRelay = mutationWithClientMutationId({
  name: 'AddActivity',
  inputFields: {
    disciplineId: {
        type: GraphQLID
    },
    distance: {
        type: GraphQLFloat
    },
    date: {
        type: GraphQLString  
    },
    userId: {
        type: GraphQLID
    }        
  },
  outputFields: {
    activityEdge: {
      type: activityConnection.edgeType,
      resolve: (obj) => {
        console.log("obj", obj)
        return ({ node: obj, cursor: obj._id})
      }
    }
  },
  mutateAndGetPayload: async (params) => {
    console.log("relay mutation", params)
    const newActivity = await resolveAddActivity(params);
    console.log("new", newActivity)
    return newActivity;
  }
})
export default addRelay;