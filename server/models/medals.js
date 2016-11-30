import mongoose from "mongoose";

const medalsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String
  },
  gold: {
    type: Number,
    default: 0
  },
  silver: {
    type: Number,
    default: 0
  },
  bronze: {
    type: Number,
    default: 0
  },
});

export default mongoose.model("Medals", medalsSchema);
