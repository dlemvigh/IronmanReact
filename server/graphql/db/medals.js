import MedalsModel from "../../models/medals";
import SummaryModel from "../../models/summary";

export function getMedals(id) {
  return SummaryModel.findById(id).exec();
}

export function getAllMedals() {
  return MedalsModel.find({}).exec();
}

export function getMedalsByUserId(userId) {
  return MedalsModel.findOne({userId}).exec();
}   
