"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getCurrentSeason = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var yearWeekId, season, _ref2, _ref3, seasonBefore, seasonAfter;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            yearWeekId = (0, _util.getYearWeekId)((0, _moment2.default)().weekYear(), (0, _moment2.default)().isoWeek());
            _context.next = 3;
            return _season2.default.findOne({
              from: { $lte: yearWeekId },
              to: { $gte: yearWeekId }
            });

          case 3:
            season = _context.sent;

            if (!(season != null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", season);

          case 6:
            _context.next = 8;
            return Promise.all([_season2.default.findOne({ to: { $lt: yearWeekId } }).sort({ to: 1 }).exec(), _season2.default.findOne({ from: { $gt: yearWeekId } }).sort({ from: 1 }).exec()]);

          case 8:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            seasonBefore = _ref3[0];
            seasonAfter = _ref3[1];
            return _context.abrupt("return", {
              name: "Off-season",
              // TODO: use moment to get prev/next week
              from: seasonBefore && seasonBefore.to + 1,
              to: seasonAfter && seasonAfter.from - 1
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCurrentSeason() {
    return _ref.apply(this, arguments);
  };
}();

var addSeason = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, url, from, to) {
    var season;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            season = new _season2.default({ name: name, url: url, from: from, to: to });
            _context2.next = 3;
            return season.save();

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function addSeason(_x, _x2, _x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var addActivity = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId, disciplineId, distance, date) {
    var _ref6, _ref7, discipline, user, activity, newActivity;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all([_discipline2.default.findById(disciplineId).select({ name: 1, score: 1, unit: 1 }).exec(), _user2.default.findById(userId).select({ name: 1 }).exec()]).catch(function (reason) {
              throw new Error(reason);
            });

          case 2:
            _ref6 = _context3.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            discipline = _ref7[0];
            user = _ref7[1];

            date = _moment2.default.utc(date).startOf("date");

            activity = new _activity2.default({
              userId: userId,
              userName: user.name,
              disciplineId: disciplineId,
              disciplineName: discipline.name,
              distance: distance,
              unit: discipline.unit,
              score: discipline.score * distance,
              date: date
            });
            _context3.next = 10;
            return activity.save();

          case 10:
            newActivity = _context3.sent;

            if (newActivity) {
              _context3.next = 13;
              break;
            }

            throw new Error("Error adding new activity");

          case 13:
            _context3.next = 15;
            return updateSummary(userId, user.name, date);

          case 15:
            return _context3.abrupt("return", newActivity);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function addActivity(_x5, _x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var editActivity = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, userId, disciplineId, distance, date) {
    var _ref9, _ref10, activity, discipline, user, beforeDate, newActivity;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all([_activity2.default.findById(id).exec(), _discipline2.default.findById(disciplineId).select({ name: 1, score: 1, unit: 1 }).exec(), _user2.default.findById(userId).select({ name: 1 }).exec()]).catch(function (reason) {
              throw new Error(reason);
            });

          case 2:
            _ref9 = _context4.sent;
            _ref10 = _slicedToArray(_ref9, 3);
            activity = _ref10[0];
            discipline = _ref10[1];
            user = _ref10[2];
            beforeDate = (0, _moment2.default)(activity.date).startOf("date").toDate();

            date = _moment2.default.utc(date).startOf("date");

            Object.assign(activity, {
              userId: userId,
              userName: user.name,
              disciplineId: disciplineId,
              disciplineName: discipline.name,
              distance: distance,
              unit: discipline.unit,
              score: discipline.score * distance,
              date: date
            });

            _context4.next = 12;
            return activity.save();

          case 12:
            newActivity = _context4.sent;

            if (newActivity) {
              _context4.next = 15;
              break;
            }

            throw new Error("Error updating activity");

          case 15:
            _context4.next = 17;
            return updateSummary(userId, user.name, date);

          case 17:
            if (!(date.diff(beforeDate, "days") != 0)) {
              _context4.next = 20;
              break;
            }

            _context4.next = 20;
            return updateSummary(userId, user.name, beforeDate);

          case 20:
            return _context4.abrupt("return", newActivity);

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function editActivity(_x9, _x10, _x11, _x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

var removeActivity = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(activityId) {
    var activity;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _activity2.default.findById(activityId);

          case 2:
            activity = _context5.sent;

            if (activity) {
              _context5.next = 5;
              break;
            }

            throw new Error("Error removing activity");

          case 5:
            _context5.next = 7;
            return activity.remove();

          case 7:
            _context5.next = 9;
            return updateSummary(activity.userId, activity.userName, (0, _moment2.default)(activity.date));

          case 9:
            return _context5.abrupt("return", activity);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function removeActivity(_x14) {
    return _ref11.apply(this, arguments);
  };
}();

var updateSummary = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, userName, date) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all([updateSummaryWeek(userId, userName, date), updateSummaryTotal(userId, userName)]);

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function updateSummary(_x15, _x16, _x17) {
    return _ref12.apply(this, arguments);
  };
}();

var updateSummaryWeek = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, userName, date) {
    var m, start, end, result, query, score, summary;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            m = (0, _moment2.default)(date);
            start = m.startOf("isoWeek").toDate();
            end = m.endOf("isoWeek").toDate();
            _context7.next = 6;
            return _activity2.default.aggregate([{
              $match: {
                userId: { $eq: _mongoose2.default.Types.ObjectId(userId) },
                date: { $gte: start, $lte: end }
              }
            }, {
              $group: {
                _id: "$userId",
                score: { $sum: "$score" }
              }
            }]).exec();

          case 6:
            result = _context7.sent;
            query = {
              userId: userId,
              week: m.isoWeek(),
              year: m.weekYear()
            };

            if (!(result.length == 0)) {
              _context7.next = 13;
              break;
            }

            _context7.next = 11;
            return _summary2.default.findOneAndRemove(query);

          case 11:
            _context7.next = 17;
            break;

          case 13:
            score = result[0].score;
            summary = Object.assign({}, query, { score: score, userName: userName });
            _context7.next = 17;
            return _summary2.default.findOneAndUpdate(query, summary, { upsert: true }).exec();

          case 17:
            _context7.next = 19;
            return updateSummaryLeader(query.week, query.year);

          case 19:
            _context7.next = 24;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](0);

            console.log("error", _context7.t0);

          case 24:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[0, 21]]);
  }));

  return function updateSummaryWeek(_x18, _x19, _x20) {
    return _ref13.apply(this, arguments);
  };
}();

var updateSummaryTotal = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userId, userName) {
    var result, query, score, summary;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _activity2.default.aggregate([{
              $match: {
                userId: { $eq: _mongoose2.default.Types.ObjectId(userId) }
              }
            }, {
              $group: {
                _id: "$userId",
                score: { $sum: "$score" }
              }
            }]).exec();

          case 3:
            result = _context8.sent;
            query = {
              userId: userId,
              week: { $exists: false },
              year: { $exists: false }
            };

            if (!(result.length == 0)) {
              _context8.next = 9;
              break;
            }

            _context8.next = 8;
            return _summary2.default.findOneAndRemove(query);

          case 8:
            return _context8.abrupt("return", _context8.sent);

          case 9:
            score = result[0].score;
            summary = {
              userId: userId,
              userName: userName,
              score: score
            };
            _context8.next = 13;
            return _summary2.default.findOneAndUpdate(query, summary, { upsert: true }).exec();

          case 13:
            _context8.next = 18;
            break;

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](0);

            console.log("error", _context8.t0);

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 15]]);
  }));

  return function updateSummaryTotal(_x21, _x22) {
    return _ref14.apply(this, arguments);
  };
}();

var updateSummaryLeader = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(week, year) {
    var summaries;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _summary2.default.find({ week: week, year: year }).sort({ score: -1 }).exec();

          case 2:
            summaries = _context9.sent;

            summaries.map(function (summary, index) {
              return summary.position = index + 1;
            });
            _context9.next = 6;
            return Promise.all(summaries.map(function (summary) {
              return summary.save();
            }));

          case 6:
            _context9.next = 8;
            return updateAllMedals();

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function updateSummaryLeader(_x23, _x24) {
    return _ref15.apply(this, arguments);
  };
}();

var updateAllMedals = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var users;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _user2.default.find({}).exec();

          case 2:
            users = _context10.sent;
            _context10.next = 5;
            return Promise.all(users.map(function (user) {
              return updateMedals(user);
            }));

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function updateAllMedals() {
    return _ref16.apply(this, arguments);
  };
}();

var updateMedals = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(user) {
    var summaries, medals;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _summary2.default.find({ userId: user._id, position: { $lte: 3 } }).exec();

          case 2:
            summaries = _context11.sent;
            medals = {
              userId: user._id,
              userName: user.name,
              gold: summaries.filter(function (x) {
                return x.position == 1;
              }).length,
              goldWeeks: summaries.filter(function (x) {
                return x.position == 1;
              }).map(function (x) {
                return (0, _util.getYearWeekId)(x.year, x.week);
              }),
              silver: summaries.filter(function (x) {
                return x.position == 2;
              }).length,
              silverWeeks: summaries.filter(function (x) {
                return x.position == 2;
              }).map(function (x) {
                return (0, _util.getYearWeekId)(x.year, x.week);
              }),
              bronze: summaries.filter(function (x) {
                return x.position == 3;
              }).length,
              bronzeWeeks: summaries.filter(function (x) {
                return x.position == 3;
              }).map(function (x) {
                return (0, _util.getYearWeekId)(x.year, x.week);
              })
            };
            _context11.next = 6;
            return _medals2.default.findOneAndUpdate({ userId: user._id }, medals, { new: true, upsert: true }).exec();

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function updateMedals(_x25) {
    return _ref17.apply(this, arguments);
  };
}();

var addUser = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(name, username) {
    var user, oldUser, newUser;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            user = { name: name, username: username };
            _context12.next = 3;
            return _user2.default.findOne({ name: username });

          case 3:
            oldUser = _context12.sent;

            if (!oldUser) {
              _context12.next = 6;
              break;
            }

            throw "username already exists";

          case 6:
            _context12.next = 8;
            return new _user2.default(user).save();

          case 8:
            newUser = _context12.sent;
            _context12.next = 11;
            return populateMedals(newUser);

          case 11:
            return _context12.abrupt("return", newUser);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function addUser(_x26, _x27) {
    return _ref18.apply(this, arguments);
  };
}();

var getUserByLogin = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(provider, providerUserId) {
    var login;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _login2.default.findOne({
              provider: provider,
              providerUserId: providerUserId
            });

          case 2:
            login = _context13.sent;

            if (!login) {
              _context13.next = 7;
              break;
            }

            _context13.next = 6;
            return _user2.default.findById(login.userId);

          case 6:
            return _context13.abrupt("return", _context13.sent);

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function getUserByLogin(_x28, _x29) {
    return _ref19.apply(this, arguments);
  };
}();

var ensureLogin = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(username, provider, providerUserId) {
    var _ref21, _ref22, login, user;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return Promise.all([_login2.default.findOne({
              provider: provider,
              providerUserId: providerUserId
            }), _user2.default.findOne({
              username: username
            })]);

          case 2:
            _ref21 = _context14.sent;
            _ref22 = _slicedToArray(_ref21, 2);
            login = _ref22[0];
            user = _ref22[1];

            if (!login) {
              _context14.next = 8;
              break;
            }

            return _context14.abrupt("return", user);

          case 8:
            if (user) {
              _context14.next = 10;
              break;
            }

            return _context14.abrupt("return");

          case 10:
            _context14.next = 12;
            return new _login2.default({
              userId: user._id,
              provider: provider,
              providerUserId: providerUserId
            }).save();

          case 12:
            return _context14.abrupt("return", user);

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function ensureLogin(_x30, _x31, _x32) {
    return _ref20.apply(this, arguments);
  };
}();

var setPersonalGoals = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(userId, goals) {
    var user, disciplineIds, disciplines;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _user2.default.findById(userId).exec();

          case 2:
            user = _context15.sent;
            disciplineIds = goals.map(function (x) {
              return _mongoose2.default.Types.ObjectId(x.disciplineId);
            });
            _context15.next = 6;
            return _discipline2.default.find({ _id: { $in: disciplineIds } });

          case 6:
            disciplines = _context15.sent;
            _context15.next = 9;
            return _personalGoal2.default.remove({ userId: userId });

          case 9:
            _context15.next = 11;
            return Promise.all(goals.map(function (goal, index) {
              return new _personalGoal2.default({
                userId: userId,
                userName: user.name,
                disciplineId: goal.disciplineId,
                disciplineName: goal.disciplineId ? disciplines.find(function (x) {
                  return x._id == goal.disciplineId;
                }).name : null,
                count: goal.count,
                dist: goal.dist,
                score: goal.score,
                priority: index + 1
              }).save();
            }));

          case 11:
            return _context15.abrupt("return", user);

          case 12:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function setPersonalGoals(_x33, _x34) {
    return _ref23.apply(this, arguments);
  };
}();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _util = require("../../shared/util");

var _activity = require("../models/activity");

var _activity2 = _interopRequireDefault(_activity);

var _discipline = require("../models/discipline");

var _discipline2 = _interopRequireDefault(_discipline);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _season = require("../models/season");

var _season2 = _interopRequireDefault(_season);

var _store = require("../models/store");

var _store2 = _interopRequireDefault(_store);

var _summary = require("../models/summary");

var _summary2 = _interopRequireDefault(_summary);

var _medals = require("../models/medals");

var _medals2 = _interopRequireDefault(_medals);

var _login = require("../models/login");

var _login2 = _interopRequireDefault(_login);

var _personalGoal = require("../models/personalGoal");

var _personalGoal2 = _interopRequireDefault(_personalGoal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var staticStore = new _store2.default(42);
function getStore() {
  return staticStore;
}

function getUser(id) {
  return _user2.default.findById(id).exec();
}

function getUserByUsername(username) {
  return _user2.default.findOne({ username: username }).exec();
}

function getUsers() {
  return _user2.default.find({}).exec();
}

function getSeason(id) {
  return _season2.default.findById(id).exec();
}

function getSeasons() {
  return _season2.default.find({}).exec();
}

function getActivity(id) {
  return _activity2.default.findById(id).exec();
}

function getActivities(args) {
  args = args || {};
  return _activity2.default.find(args).sort({ date: -1 }).exec();
}

function getDiscipline(id) {
  return _discipline2.default.findById(id).exec();
}

function getDisciplines() {
  return _discipline2.default.find({}).exec();
}

function getSummary(id) {
  return _summary2.default.findById(id).exec();
}

function getMedals(id) {
  return _summary2.default.findById(id).exec();
}

function getAllSummaries(week, year) {
  if (week && year) {
    return _summary2.default.find({ week: week, year: year }).exec();
  } else {
    var query = {
      week: { $exists: false },
      year: { $exists: false }
    };
    return _summary2.default.find(query).exec();
  }
}

function getAllWeekSummaries() {
  var query = {
    week: { $exists: true },
    year: { $exists: true }
  };
  return _summary2.default.find(query).exec();
}

function getWeekSummary(userId, week, year) {
  if (week && year) {
    return _summary2.default.findOne({ userId: userId, week: week, year: year }).exec();
  } else {
    var query = {
      userId: userId,
      week: { $exists: false },
      year: { $exists: false }
    };
    return _summary2.default.findOne(query).exec();
  }
}

function getAllMedals() {
  return _medals2.default.find({}).exec();
}

function getMedalsByUserId(userId) {
  return _medals2.default.findOne({ userId: userId }).exec();
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

function getLogin(id) {
  return _login2.default.findById(id).exec();
}

function getPersonalGoal(id) {
  return _personalGoal2.default.findById(id).exec();
}

function getPersonalGoalsByUser(userId) {
  return _personalGoal2.default.find({ userId: userId }).sort({ priority: 1 }).exec();
}

exports.default = {
  ActivityModel: _activity2.default,
  DisciplineModel: _discipline2.default,
  UserModel: _user2.default,
  SeasonModel: _season2.default,
  StoreModel: _store2.default,
  SummaryModel: _summary2.default,
  LoginModel: _login2.default,
  PersonalGoalModel: _personalGoal2.default,
  getSeason: getSeason,
  getSeasons: getSeasons,
  getCurrentSeason: getCurrentSeason,
  addSeason: addSeason,
  getActivity: getActivity,
  getActivities: getActivities,
  getDiscipline: getDiscipline,
  getDisciplines: getDisciplines,
  getUser: getUser,
  getUserByUsername: getUserByUsername,
  getUsers: getUsers,
  getStore: getStore,
  addActivity: addActivity,
  editActivity: editActivity,
  removeActivity: removeActivity,
  getSummary: getSummary,
  getAllSummaries: getAllSummaries,
  getWeekSummary: getWeekSummary,
  getAllWeekSummaries: getAllWeekSummaries,
  getMedals: getMedals,
  getAllMedals: getAllMedals,
  getMedalsByUserId: getMedalsByUserId,
  addUser: addUser,
  getLogin: getLogin,
  getUserByLogin: getUserByLogin,
  ensureLogin: ensureLogin,
  getPersonalGoal: getPersonalGoal,
  getPersonalGoalsByUser: getPersonalGoalsByUser,
  setPersonalGoals: setPersonalGoals
};