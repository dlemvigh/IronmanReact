"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populate = populate;

var _discipline = require("../models/discipline");

var _discipline2 = _interopRequireDefault(_discipline);

var _medals = require("../models/medals");

var _medals2 = _interopRequireDefault(_medals);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _season = require("../models/season");

var _season2 = _interopRequireDefault(_season);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disciplines = [{ name: "run", score: 5, unit: "km" }, { name: "swim", score: 25, unit: "km" }, { name: "bike", score: 1, unit: "km" }, { name: "caloric", score: .06, unit: "cal" }, { name: "misc", score: 25, unit: "hours" }];

var users = [{ name: "David", username: "david" }, { name: "Mads", username: "mads" }, { name: "Sidsel", username: "sidsel" }];

var seasons = [
  // { name: "Spring 2017", url: "spring2017", from: 201701, to: 201720 },
  // { name: "Fall 2017", url: "spring2017", from: 201730, to: 201750 }
];

function populateDisciplines() {
  disciplines.forEach(function (disc) {
    _discipline2.default.findOne({
      name: disc.name
    }, function (err, result) {
      if (err) {
        console.err("error finding discipline", disc.name);
      } else if (!result) {
        console.log("creating", disc.name);
        new _discipline2.default(disc).save();
      }
    });
  });
}

function populateUsers() {
  users.forEach(function (user) {
    _user2.default.findOne({
      name: user.name
    }, function (err, result) {
      if (err) {
        console.log("error finding user", user.name);
      } else if (!result) {
        console.log("creating", user.name);
        new _user2.default(user).save(function (err2, result2) {
          if (err2) {
            console.log("error adding user", user.name);
          } else {
            populateMedals(result2);
          }
        });
      } else {
        populateMedals(result);
      }
    });
  });
}

function populateMedals(user) {
  _medals2.default.findOne({
    userId: user._id
  }, function (err, result) {
    if (err) {
      console.log("error finding medal");
    } else if (!result) {
      var medal = {
        userId: user._id,
        userName: user.name,
        gold: 0,
        silver: 0,
        bronze: 0
      };
      new _medals2.default(medal).save(function (err2) {
        if (err2) {
          console.log("error saving medal", err2);
        }
      });
    }
  });
}

function populateSeasons() {
  seasons.forEach(function (season) {
    _season2.default.findOne({
      name: season.name
    }, function (err, result) {
      if (err) {
        console.error("error finding season", season.name);
      } else if (!result) {
        console.log("creating", season.name);
        new _season2.default(season).save();
      }
    });
  });
}

function populate() {
  populateDisciplines();
  populateUsers();
  populateSeasons();
}