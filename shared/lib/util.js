const moment = require("moment");

function getYearWeekId(year, week) {
  year = year || moment().weekYear();
  week = week || moment().isoWeek();
  return year * 100 + week;
}

function fromYearWeekId(yearWeekId) {
  const year = yearWeekId / 100 | 0;
  const week = yearWeekId % 100;
  return moment().weekYear(year).isoWeek(week);
}

function filterMedals(medals, season) {
  const currentWeek = getYearWeekId(moment().weekYear(), moment().isoWeek());
  medals = medals.filter(x => x < currentWeek);

  if (season == null) { return medals; }

  const from = season.from;
  const to = season.to;
  medals = medals.filter(x => (from == null || from <= x) && (to == null || x <= to));
  return medals;
}

module.exports = {
  getYearWeekId,
  fromYearWeekId,
  filterMedals
};