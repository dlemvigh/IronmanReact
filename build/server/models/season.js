"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seasonSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  }
});

exports.default = _mongoose2.default.model("Season", seasonSchema);