"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activitySchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  disciplineId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  },
  disciplineName: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    default: 0
  },
  unit: {
    type: String
  },
  score: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

activitySchema.virtual("week").get(function () {
  return (0, _moment2.default)(this.date).isoWeek();
});

activitySchema.virtual("year").get(function () {
  return (0, _moment2.default)(this.date).weekYear();
});

exports.default = _mongoose2.default.model("Activity", activitySchema);