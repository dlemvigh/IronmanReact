import mongoose from 'mongoose'
import moment from 'moment'

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

function getMedals(id) {
    return SummaryModel.findById(id).exec();
}

function getAllSummaries(week, year) {
    if (week && year) {
        return SummaryModel.find({week, year}).exec()
    }else{
        const query = {
            week: { $exists: false },
            year: { $exists: false }
        };
        return SummaryModel.find(query).exec();
    }
}

function getWeekSummary(userId, week, year) {
    if (week && year) {
        return SummaryModel.findOne({userId, week, year}).exec()
    }else{
        const query = {
            userId,
            week: { $exists: false },
            year: { $exists: false }
        };
        return SummaryModel.findOne(query).exec();
    }
}

async function addActivity(userId, disciplineId, distance, date) {
    const [discipline, user] = await Promise.all([
       DisciplineModel.findById(disciplineId).select({name: 1, score: 1, unit: 1}).exec(),
       UserModel.findById(userId).select({name: 1}).exec()
     ]).catch((reason) => {
        throw new Error(reason)     
     });
     date = moment.utc(date).startOf("date")

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
     const beforeDate = moment(activity.date).startOf("date").toDate();
     date = moment.utc(date).startOf("date")

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
     await updateSummary(activity.userId, activity.userName, moment(activity.date));
     return activity;
 }

async function updateSummary(userId, userName, date) {
    await Promise.all([
        updateSummaryWeek(userId, userName, date),
        updateSummaryTotal(userId, userName)
    ]);
}

async function updateSummaryWeek(userId, userName, date) {
    try {
        const m = moment(date);
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

        const query = {
            userId,
            week: m.isoWeek(),
            year: m.year()
        };

        if (result.length == 0) {
            await SummaryModel.findOneAndRemove(query);
        }else{
            const score = result[0].score;
            const summary = Object.assign({}, query, {score, userName});

            await SummaryModel.findOneAndUpdate(query, summary, {upsert: true}).exec();
        }
        await updateSummaryLeader(query.week, query.year);
    }catch(error){
        console.log("error", error)
    }
}

async function updateSummaryTotal(userId, userName) {
    try {
        const result = await ActivityModel.aggregate([{   
            $match: { 
                userId: { $eq: mongoose.Types.ObjectId(userId) }
            }
        }, {
            $group: {
                _id: "$userId",
                score: { $sum: "$score" }
            }
        }]).exec(); 

        const query = {
            userId,
            week: { $exists: false },
            year: { $exists: false }
        };

        if (result.length == 0) {
            return await SummaryModel.findOneAndRemove(query);
        }

        const score = result[0].score;
        const summary = {
            userId,
            userName,
            score
        };

        await SummaryModel.findOneAndUpdate(query, summary, {upsert: true}).exec();
    }catch(error){
        console.log("error", error)
    }
}

async function updateSummaryLeader(week, year) {
    const summaries = await SummaryModel.find({week, year}).sort({score: -1}).exec();
    summaries.map((summary, index) => summary.position = index + 1);
    await Promise.all(summaries.map(summary => summary.save()));
    await updateAllMedals();
}

async function updateAllMedals() {
    const users = await UserModel.find({}).exec();
    await Promise.all(users.map(user => updateMedals(user)));
}

async function updateMedals(user) {
    const summaries = await SummaryModel.find({userId: user._id, position: { $lte: 3 }}).exec();
    const medals = {
        userId: user._id,
        userName: user.name,
        gold: summaries.filter(x => x.position == 1).length,
        silver: summaries.filter(x => x.position == 2).length,
        bronze: summaries.filter(x => x.position == 3).length
    }
    await MedalsModel.findOneAndUpdate({ userId: user._id}, medals, {new: true, upsert: true}).exec()
}

function getAllMedals() {
    return MedalsModel.find({}).exec()
}

function getMedalsByUserId(userId) {
    return MedalsModel.findOne({userId}).exec();
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
    getAllSummaries,
    getWeekSummary,
    getMedals,
    getAllMedals,
    getMedalsByUserId,
};
