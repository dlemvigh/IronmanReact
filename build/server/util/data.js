"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.populate = populate;

var _discipline = require("../models/discipline");

var _discipline2 = _interopRequireDefault(_discipline);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disciplines = [{ name: "run", score: 5, unit: "km" }, { name: "swim", score: 25, unit: "km" }, { name: "bike", score: 1, unit: "km" }, { name: "caloric", score: .06, unit: "cal" }, { name: "misc", score: 25, unit: "hours" }];

var users = [{ name: "David", username: "david" }, { name: "Mads", username: "mads" }, { name: "Sidsel", username: "sidsel" }];

function populate() {
    disciplines.forEach(function (disc) {
        _discipline2.default.findOne({
            name: disc.name
        }, function (err, result) {
            if (err || result) {
                // console.log("discipline found")
            } else {
                console.log("creating", disc.name);
                new _discipline2.default(disc).save();
            }
        });
    });

    users.forEach(function (user) {
        _user2.default.findOne({
            name: user.name
        }, function (err, result) {
            if (err || result) {
                // console.log("user found")
            } else {
                console.log("creating", user.name);
                new _user2.default(user).save();
            }
        });
    });
};