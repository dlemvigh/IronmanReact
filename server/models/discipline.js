import mongoose from "mongoose"

const disciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
});

export default mongoose.model("Discipline", disciplineSchema);
