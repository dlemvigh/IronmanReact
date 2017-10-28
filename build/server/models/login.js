"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginSchema = new _mongoose2.default.Schema({
  userId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
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

exports.default = _mongoose2.default.model("Login", loginSchema);