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

disciplineSchema.virtual('id').get(function() { return this._id; })

export default mongoose.model("Discipline", disciplineSchema);
