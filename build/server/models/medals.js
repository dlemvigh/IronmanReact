"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var medalsSchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
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
  }
});

exports.default = _mongoose2.default.model("Medals", medalsSchema);