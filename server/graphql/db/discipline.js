import DisciplineModel from "../../models/discipline";

export function getDiscipline(id) {
  return DisciplineModel.findById(id).exec();
}

export function getDisciplines() {
  return DisciplineModel.find({}).exec();
}
