import mongoose from "mongoose"
import moment from "moment"

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true        
    },
    userName: {
        type: String,
        required: true
    },
    disciplineId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    disciplineName: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        default: 0
    },
    unit: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

activitySchema.virtual('week').get(function(){
    return moment(this.date).isoWeek();
})

activitySchema.virtual('year').get(function(){
    return moment(this.date).year();
})

export default mongoose.model("Activity", activitySchema);
