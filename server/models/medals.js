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
  goldWeeks: {
    type: [Number],
    default: []
  },
  silver: {
    type: Number,
    default: 0
  },
  silverWeeks: {
    type: [Number],
    default: []
  },
  bronze: {
    type: Number,
    default: 0
  },
  bronzeWeeks: {
    type: [Number],
    default: []
  },
});

export default mongoose.model("Medals", medalsSchema);
