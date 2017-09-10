import mongoose from "mongoose";

const personalGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
  },
  disciplineId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  disciplineName: {
    type: String,
  },
  count: {
    type: Number,
  },
  dist: {
    type: Number,
  },
  score: {
    type: Number,
  },
  priority: {
    type: Number
  }
});

export default mongoose.model("PersonalGoal", personalGoalSchema);