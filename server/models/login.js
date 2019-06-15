const mongoose = require("mongoose");
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
  }
});
module.exports = mongoose.model("Login", loginSchema);