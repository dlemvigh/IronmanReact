"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var summarySchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String
  },
  score: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
    default: 0
  },
  week: {
    type: Number
  },
  year: {
    type: Number
  }
});

exports.default = _mongoose2.default.model("Summary", summarySchema);