import mongoose from "mongoose"

const summarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true        
    },
    score: {
      type: Number,
      default: 0
    },
    week: {
      type: Number
    },
    year: {
      type: Number
    }
});

export default mongoose.model("Summary", summarySchema);
