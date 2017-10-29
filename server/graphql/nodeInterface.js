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

import database from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type == "Store") {
      return database.getStore();
    } else if (type === "User") {
      return database.getUser(id);
    } else if (type === "Activity") {
      return database.getActivity(id);
    } else if (type === "Discipline") {
      return database.getDiscipline(id);
    } else if (type === "Summary") {
      return database.getSummary(id);
    } else if (type === "Medals") {
      return database.getMedals(id);
    } else if (type == "Season") {
      return database.getSeason(id);
    } else if (type == "Login") {
      return database.getLogin(id);
    } else if (type == "PersonalGoal") {
      return database.getPersonalGoal(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof database.StoreModel) {
      return storeType;
    } else if (obj instanceof database.UserModel) {
      return userType;
    } else if (obj instanceof database.ActivityModel) {
      return activityType;
    } else if (obj instanceof database.DisciplineModel) {
      return disciplineType;
    } else if (obj instanceof database.SummaryModel) {
      return summaryType;
    } else if (obj instanceof database.MedalsModel) {
      return medalsType;
    } else if (obj instanceof database.SeasonModel) {
      return seasonType;
    } else if (obj instanceof database.LoginModel) {
      return loginType;
    } else if (obj instanceof database.PersonalGoalModel) {
      return personalGoalType;
    }
    return null;
  }
);

export { nodeInterface, nodeField };