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
  },
  raw: {
    type: Object
  },
  status: {
    type: String,
    required: true,
    default: "UNKNOWN"
  }
});

const SyncLogModel = exports = mongoose.model("SyncLog", syncLogSchema);

SyncLogModel.Status = {
  NEW: "NEW", // newly imported, not yet added to activities
  ADDED: "ADDED", // added to activities
  CHANGED: "CHANGED", // added but later changed
  REMOVED: "REMOVED", // added but later removed
  CONFLICT: "CONFLICT", // conflicting activities existed at import, 
  UNKNOWN: "UNKNOWN" // fallback state
};

module.exports = SyncLogModel;