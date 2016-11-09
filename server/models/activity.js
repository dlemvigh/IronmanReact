import mongoose from "mongoose"

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

export default mongoose.model("Activity", activitySchema);
