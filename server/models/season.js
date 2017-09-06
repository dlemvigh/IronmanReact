import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Season", seasonSchema);