"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var personalGoalSchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String
  },
  disciplineId: {
    type: _mongoose2.default.Schema.Types.ObjectId
  },
  disciplineName: {
    type: String
  },
  count: {
    type: Number
  },
  dist: {
    type: Number
  },
  score: {
    type: Number
  },
  priority: {
    type: Number
  }
});

exports.default = _mongoose2.default.model("PersonalGoal", personalGoalSchema);