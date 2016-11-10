import ActivityModel from '../models/activity'
import DisciplineModel from '../models/discipline'
import UserModel from '../models/user'
import StoreModel from '../models/store'
import SummaryModel from '../models/summary'
import Moment from 'moment'

const staticStore = new StoreModel(42);
function getStore() {
    return staticStore
}

function getUser(id) {
    return UserModel.findById(id).exec()
}

function getUsers() {
    return UserModel.find({}).exec();
}

function getActivity(id) {
    return ActivityModel.findById(id).exec(); 
}

function getActivities(args) {
    args = args || {};
    return ActivityModel.find(args).sort({date: -1}).exec();
}

function getDiscipline(id) {
    return DisciplineModel.findById(id).exec();
}

function getDisciplines() {
    return DisciplineModel.find({}).exec()
}

async function addActivity(userId, disciplineId, distance, date) {
    const [discipline, user] = await Promise.all([
       DisciplineModel.findById(disciplineId).select({name: 1, score: 1, unit: 1}).exec(),
       UserModel.findById(userId).select({name: 1}).exec()
     ]).catch((reason) => {
        throw new Error(reason)     
     });
     date = Moment(date).startOf("date")

     const activity = new ActivityModel({
       userId,
       userName: user.name,
       disciplineId,
       disciplineName: discipline.name,
       distance,
       unit: discipline.unit,
       score: discipline.score * distance,
       date
     });

     const newActivity = await activity.save();
     if (!newActivity){
       throw new Error('Error adding new activity');
     }
 
     return newActivity;  
 }

 async function removeActivity(activityId) {
     const activity = await ActivityModel.findById(activityId);
     if (!activity){
       throw new Error('Error removing activity');
     }
     await activity.remove();
     return activity;
 }

function getSummary(id) {
    console.log("get", id);
    var model = new SummaryModel({
        userId: id,
        userName: "bar",
        score: 13,
    });

    console.log("model", model)
    return model;
}

function getCachedSummary(userId, week, year) {
    return new SummaryModel({
        userId,
        userName: "foo",
        score: 42,
        week,
        year
    });
}

function calcSummary(userId, week, year) {
}

function clearCachedSummary(userId, week, year) {

}

export default {
    ActivityModel,
    DisciplineModel,
    UserModel,
    StoreModel,
    SummaryModel,
    getActivity,
    getActivities,
    getDiscipline,
    getDisciplines,
    getUser,
    getUsers,
    getStore,
    addActivity,
    removeActivity,
    getSummary,
    getCachedSummary    
};
