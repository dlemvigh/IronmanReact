import mongoose from 'mongoose'
import Moment from 'moment'
import _ from 'lodash'

import ActivityModel from '../models/activity'
import DisciplineModel from '../models/discipline'
import UserModel from '../models/user'
import StoreModel from '../models/store'
import SummaryModel from '../models/summary'
import MedalsModel from '../models/medals'

const staticStore = new StoreModel(42);
function getStore() {
    return staticStore
}

function getUser(id) {
    return UserModel.findById(id).exec()
}

function getUserByUsername(username) {
    return UserModel.findOne({username}).exec()
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

function getSummary(id) {
    return SummaryModel.findById(id).exec();
}

async function getWeekSummary(userId, week, year) {
    if (week && year) {
        return await SummaryModel.findOne({userId, week, year}).exec()
    }
    const result = await SummaryModel.aggregate([{
        $match: { userId: { $eq: mongoose.Types.ObjectId(userId) } }
    },{
        $group: {
            _id: "$userId",
            userId: { $first: "$userId" },
            userName: { $first: "$userName" },
            score: { $sum: "$score" }
        }
    }]).exec();
    return result[0];
}

function getTotalSummary(userId) {

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
     await updateSummary(userId, user.name, date);
     return newActivity;  
 }

async function editActivity(id, userId, disciplineId, distance, date) {
    const [activity, discipline, user] = await Promise.all([
        ActivityModel.findById(id).exec(),
        DisciplineModel.findById(disciplineId).select({name: 1, score: 1, unit: 1}).exec(),
        UserModel.findById(userId).select({name: 1}).exec()
     ]).catch((reason) => {
        throw new Error(reason)     
     });
     const beforeDate = Moment(activity.date).startOf("date").toDate();
     console.log("before", beforeDate)
     date = Moment(date).startOf("date")

     Object.assign(activity, {
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
       throw new Error('Error updating activity');
     }     
     await updateSummary(userId, user.name, date);
     if (date.diff(beforeDate, 'days') != 0) {
         await updateSummary(userId, user.name, beforeDate);
     }
     return newActivity;  
 }

 async function removeActivity(activityId) {
     const activity = await ActivityModel.findById(activityId);
     if (!activity){
       throw new Error('Error removing activity');
     }
     await activity.remove();
     await updateSummary(activity.userId, activity.userName, activity.date);
     return activity;
 }

async function updateSummary(userId, userName, date) {
    console.log("update", userId, date, arguments)
    try {
        const m = Moment(date);
        const start = m.startOf("isoWeek").toDate();
        const end = m.endOf("isoWeek").toDate();

        const result = await ActivityModel.aggregate([{   
            $match: { 
                userId: { $eq: mongoose.Types.ObjectId(userId) },
                date: { $gte: start, $lte: end}
            }
        }, {
            $group: {
                _id: "$userId",
                score: { $sum: "$score" }
            }
        }]).exec(); 
        console.log("res", result)
        const score = result[0].score;
        console.log("score", score)

        const query = {
            userId,
            week: m.isoWeek(),
            year: m.year()
        };
        const summary = Object.assign({}, query, {score, userName});

        const newSummary = await SummaryModel.findOneAndUpdate(query, summary, {upsert: true}).exec();
        console.log("summary", summary, newSummary)
    }catch(error){
        console.log("error", error)
    }
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
    getUserByUsername,
    getUsers,
    getStore,
    addActivity,
    editActivity,
    removeActivity,
    getSummary,
    getWeekSummary
};
