'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var addActivity = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(userId, disciplineId, distance, date) {
        var _ref2, _ref3, discipline, user, activity, newActivity;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Promise.all([_discipline2.default.findById(disciplineId).select({ name: 1, score: 1, unit: 1 }).exec(), _user2.default.findById(userId).select({ name: 1 }).exec()]).catch(function (reason) {
                            throw new Error(reason);
                        });

                    case 2:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        discipline = _ref3[0];
                        user = _ref3[1];

                        date = (0, _moment2.default)(date).startOf("date");

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
                        _context.next = 10;
                        return activity.save();

                    case 10:
                        newActivity = _context.sent;

                        if (newActivity) {
                            _context.next = 13;
                            break;
                        }

                        throw new Error('Error adding new activity');

                    case 13:
                        _context.next = 15;
                        return clearCachedSummary(newActivity.userId, newActivity.date);

                    case 15:
                        return _context.abrupt('return', newActivity);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function addActivity(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var removeActivity = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(activityId) {
        var activity;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _activity2.default.findById(activityId);

                    case 2:
                        activity = _context2.sent;

                        if (activity) {
                            _context2.next = 5;
                            break;
                        }

                        throw new Error('Error removing activity');

                    case 5:
                        _context2.next = 7;
                        return activity.remove();

                    case 7:
                        _context2.next = 9;
                        return clearCachedSummary(activity.userId, activity.date);

                    case 9:
                        return _context2.abrupt('return', activity);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function removeActivity(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

var getCachedSummary = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(userId, week, year) {
        var cached;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _summary2.default.findOne({ userId: userId, week: week, year: year }).exec();

                    case 2:
                        cached = _context3.sent;

                        if (cached) {
                            _context3.next = 7;
                            break;
                        }

                        _context3.next = 6;
                        return calcSummary(userId, week, year);

                    case 6:
                        cached = _context3.sent;

                    case 7:
                        return _context3.abrupt('return', cached);

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function getCachedSummary(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();

var calcSummary = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(userId, week, year) {
        var query, m, start, end, activities, score, user, summary, newSummary;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        query = { userId: userId };

                        if (week && year) {
                            m = new _moment2.default().isoWeek(week).year(year);
                            start = m.startOf("isoWeek").toDate();
                            end = m.endOf("isoWeek").toDate();

                            query.date = {
                                $gte: start,
                                $lte: end
                            };
                        }
                        _context4.next = 4;
                        return _activity2.default.find(query).select({ score: 1 });

                    case 4:
                        activities = _context4.sent;
                        score = activities.reduce(function (sum, act) {
                            return sum + act.score;
                        }, 0);
                        _context4.next = 8;
                        return getUser(userId);

                    case 8:
                        user = _context4.sent;
                        summary = new _summary2.default({
                            userId: userId,
                            userName: user.name,
                            score: score,
                            week: week,
                            year: year
                        });
                        _context4.next = 12;
                        return summary.save();

                    case 12:
                        newSummary = _context4.sent;

                        if (newSummary) {
                            _context4.next = 15;
                            break;
                        }

                        throw new Error('Error adding new summary');

                    case 15:
                        return _context4.abrupt('return', newSummary);

                    case 16:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function calcSummary(_x9, _x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

var clearCachedSummary = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(userId, date) {
        var m, week, year;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        m = (0, _moment2.default)(date);
                        week = m.isoWeek();
                        year = m.year();
                        _context5.next = 5;
                        return Promise.all([_summary2.default.findOneAndRemove({ userId: userId, week: week, year: year }).exec(), _summary2.default.findOneAndRemove({ userId: userId, week: null, year: null }).exec()]);

                    case 5:
                        return _context5.abrupt('return', _context5.sent);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function clearCachedSummary(_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

var _activity = require('../models/activity');

var _activity2 = _interopRequireDefault(_activity);

var _discipline = require('../models/discipline');

var _discipline2 = _interopRequireDefault(_discipline);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _store = require('../models/store');

var _store2 = _interopRequireDefault(_store);

var _summary = require('../models/summary');

var _summary2 = _interopRequireDefault(_summary);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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

exports.default = {
    ActivityModel: _activity2.default,
    DisciplineModel: _discipline2.default,
    UserModel: _user2.default,
    StoreModel: _store2.default,
    SummaryModel: _summary2.default,
    getActivity: getActivity,
    getActivities: getActivities,
    getDiscipline: getDiscipline,
    getDisciplines: getDisciplines,
    getUser: getUser,
    getUserByUsername: getUserByUsername,
    getUsers: getUsers,
    getStore: getStore,
    addActivity: addActivity,
    removeActivity: removeActivity,
    getSummary: getSummary,
    getCachedSummary: getCachedSummary
};