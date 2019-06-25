const mongoose = require("mongoose");

const syncLogSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  external_id: {
    type: String
  },
  name: {
    type: String
  },
  distance: {
    type: Number
  },
  moving_time: {
    type: Number
  },
  elapsed_time: {
    type: Number
  },
  start_date: {
    type: Date
  },
  start_date_local: {
    type: Date
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model("SyncLog", syncLogSchema);