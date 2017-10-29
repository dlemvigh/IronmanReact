import mongoose from "mongoose";

import DisciplineModel from "../../models/discipline";
import PersonalGoalModel from "../../models/personalGoal";
import UserModel from "../../models/user";

export function getPersonalGoal(id) {
  return PersonalGoalModel.findById(id).exec(); 
}

export function getPersonalGoalsByUser(userId) {
  return PersonalGoalModel.find({userId}).sort({priority: 1}).exec(); 
}

export async function setPersonalGoals(userId, goals) {
  const user = await UserModel.findById(userId).exec();
  const disciplineIds = goals.map(x => mongoose.Types.ObjectId(x.disciplineId));
  const disciplines = await DisciplineModel.find({ _id: { $in: disciplineIds } });

  await PersonalGoalModel.remove({userId});

  await Promise.all(goals.map((goal, index) => 
    new PersonalGoalModel({
      userId,
      userName: user.name,
      disciplineId: goal.disciplineId,
      disciplineName: goal.disciplineId ? 
        disciplines.find(x => x._id == goal.disciplineId).name : null,
      count: goal.count,
      dist: goal.dist,
      score: goal.score,
      priority: index + 1
    }).save()
  ));

  return user;
}
