import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  providerUserId: {
    type: String,
    required: true
  },
});

export default mongoose.model("Login", loginSchema);