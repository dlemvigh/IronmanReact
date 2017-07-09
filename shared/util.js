import moment from "moment";

export function getYearWeekId(year, week) {
  return year * 100 + week;
}

export function filterMedals(medals, season) {
  const currentWeek = getYearWeekId(moment().year(), moment().isoWeek());
  medals = medals.filter(x => x < currentWeek);

  if (season == null) return medals;

  const from = season.from;
  const to = season.to;
  medals = medals.filter(x => (from == null || from <= x) && (to == null || x <= to));
  return medals;
}
