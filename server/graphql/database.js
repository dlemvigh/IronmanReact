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
 
     await clearCachedSummary(newActivity.userId, newActivity.date);
     return newActivity;  
 }

 async function removeActivity(activityId) {
     const activity = await ActivityModel.findById(activityId);
     if (!activity){
       throw new Error('Error removing activity');
     }
     await activity.remove();
     await clearCachedSummary(activity.userId, activity.date);
     return activity;
 }

function getSummary(id) {
    return SummaryModel.findById(id).exec();
}

async function getCachedSummary(userId, week, year) {
    let cached = await SummaryModel.findOne({ userId, week, year }).exec();
    if (!cached) {
        cached = await calcSummary(userId, week, year);
    }
    return cached;
}

async function calcSummary(userId, week, year) {
    const query = { userId };
    if (week && year) {
        const m = new Moment().isoWeek(week).year(year);
        const start = m.startOf("isoWeek").toDate();
        const end = m.endOf("isoWeek").toDate();
        query.date = {
            $gte: start,
            $lte: end
        }
    }
    const activities = await ActivityModel.find(query).select({score: 1});
    const score = activities.reduce((sum, act) => sum + act.score, 0);

    const user = await getUser(userId);
    const summary = new SummaryModel({
        userId,
        userName: user.name,
        score,
        week,
        year
    });

    const newSummary = await summary.save();
     if (!newSummary){
       throw new Error('Error adding new summary');
     }
 
     return newSummary;  
}

async function clearCachedSummary(userId, date) {
    const m = Moment(date);
    const week = m.isoWeek();
    const year = m.year();
    return await Promise.all([
        SummaryModel.findOneAndRemove({userId, week, year}).exec(),
        SummaryModel.findOneAndRemove({userId, week: null, year: null}).exec()
    ]);
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
