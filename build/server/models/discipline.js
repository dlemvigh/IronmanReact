"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disciplineSchema = new _mongoose2.default.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
});

disciplineSchema.virtual('id').get(function () {
    return this._id;
});

exports.default = _mongoose2.default.model("Discipline", disciplineSchema);