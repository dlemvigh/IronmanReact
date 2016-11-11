'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _activity = require('./activity');

var _activity2 = _interopRequireDefault(_activity);

var _discipline = require('./discipline');

var _discipline2 = _interopRequireDefault(_discipline);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    ActivityModel: _activity2.default,
    DisciplineModel: _discipline2.default,
    UserModel: _user2.default
};