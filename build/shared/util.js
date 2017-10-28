"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYearWeekId = getYearWeekId;
exports.fromYearWeekId = fromYearWeekId;
exports.filterMedals = filterMedals;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getYearWeekId(year, week) {
  year = year || (0, _moment2.default)().weekYear();
  week = week || (0, _moment2.default)().isoWeek();
  return year * 100 + week;
}

function fromYearWeekId(yearWeekId) {
  var year = yearWeekId / 100 | 0;
  var week = yearWeekId % 100;
  return (0, _moment2.default)().weekYear(year).isoWeek(week);
}

function filterMedals(medals, season) {
  var currentWeek = getYearWeekId((0, _moment2.default)().weekYear(), (0, _moment2.default)().isoWeek());
  medals = medals.filter(function (x) {
    return x < currentWeek;
  });

  if (season == null) {
    return medals;
  }

  var from = season.from;
  var to = season.to;
  medals = medals.filter(function (x) {
    return (from == null || from <= x) && (to == null || x <= to);
  });
  return medals;
}