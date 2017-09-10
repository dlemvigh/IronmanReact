import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  active: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("User", userSchema);
