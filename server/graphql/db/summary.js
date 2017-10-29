import SummaryModel from "../../models/summary";

export function getSummary(id) {
  return SummaryModel.findById(id).exec();
}

export function getAllSummaries(week, year) {
  if (week && year) {
    return SummaryModel.find({week, year}).exec();
  } else {
    const query = {
      week: { $exists: false },
      year: { $exists: false }
    };
    return SummaryModel.find(query).exec();
  }
}

export function getAllWeekSummaries() {
  const query = {
    week: { $exists: true },
    year: { $exists: true }
  };
  return SummaryModel.find(query).exec();
}

export function getWeekSummary(userId, week, year) {
  if (week && year) {
    return SummaryModel.findOne({userId, week, year}).exec();
  } else {
    const query = {
      userId,
      week: { $exists: false },
      year: { $exists: false }
    };
    return SummaryModel.findOne(query).exec();
  }
}
