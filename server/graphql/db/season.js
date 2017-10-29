
import moment from "moment";

import SeasonModel from "../../models/season";
import { getYearWeekId } from "../../../shared/util";

export function getSeason(id) {
  return SeasonModel.findById(id).exec();
}

export function getSeasons() {
  return SeasonModel.find({}).exec();
}

export async function getCurrentSeason() {
  const yearWeekId = getYearWeekId(moment().weekYear(), moment().isoWeek());
  const season = await SeasonModel.findOne({
    from: { $lte: yearWeekId },
    to: { $gte: yearWeekId }
  });
  if (season != null) { return season; }

  const [seasonBefore, seasonAfter] = await Promise.all([
    SeasonModel.findOne({ to: { $lt: yearWeekId } }).sort({to: 1}).exec(),
    SeasonModel.findOne({ from: { $gt: yearWeekId } }).sort({from: 1}).exec()
  ]);

  return {
    name: "Off-season",
    // TODO: use moment to get prev/next week
    from: seasonBefore && seasonBefore.to + 1,
    to: seasonAfter && seasonAfter.from - 1
  };
}

export async function addSeason(name, url, from, to) {
  const season = new SeasonModel({ name, url, from, to });
  return await season.save();
}
