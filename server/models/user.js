const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  syncAthleteId: {
    type: Number
  }
});
module.exports = mongoose.model("User", userSchema);
