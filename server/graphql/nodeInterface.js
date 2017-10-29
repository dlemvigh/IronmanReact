import {
  fromGlobalId,
  nodeDefinitions,
} from "graphql-relay";

import activityType from './types/activityType';
import disciplineType from './types/disciplineType';
import loginType from './types/loginType';
import medalsType from './types/medalsType';
import personalGoalType from './types/personalGoalType';
import seasonType from './types/seasonType';
import storeType from './types/storeType';
import summaryType from './types/summaryType';
import userType from './types/userType';

import ActivityModel from "../models/activity";
import DisciplineModel from "../models/discipline";
import UserModel from "../models/user";
import SeasonModel from "../models/season";
import StoreModel from "../models/store";
import SummaryModel from "../models/summary";
import MedalsModel from "../models/medals";
import LoginModel from "../models/login";
import PersonalGoalModel from "../models/personalGoal";

import database from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type == "Store") {
      return database.getStore();
    } else if (type === "Activity") {
      return database.getActivity(id);
    } else if (type === "Discipline") {
      return database.getDiscipline(id);
    } else if (type == "Login") {
      return database.getLogin(id);
    } else if (type === "Medals") {
      return database.getMedals(id);
    } else if (type == "PersonalGoal") {
      return database.getPersonalGoal(id);
    } else if (type == "Season") {
      return database.getSeason(id);
    } else if (type === "Summary") {
      return database.getSummary(id);
    } else if (type === "User") {
      return database.getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof StoreModel) {
      return storeType;
    } else if (obj instanceof ActivityModel) {
      return activityType;
    } else if (obj instanceof DisciplineModel) {
      return disciplineType;
    } else if (obj instanceof LoginModel) {
      return loginType;
    } else if (obj instanceof MedalsModel) {
      return medalsType;
    } else if (obj instanceof PersonalGoalModel) {
      return personalGoalType;
    } else if (obj instanceof SeasonModel) {
      return seasonType;
    } else if (obj instanceof SummaryModel) {
      return summaryType;
    } else if (obj instanceof UserModel) {
      return userType;
    }
    return null;
  }
);

export { nodeInterface, nodeField };