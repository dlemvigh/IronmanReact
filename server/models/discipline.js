const mongoose = require("mongoose")
const disciplineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  order: {
    type: Number
  }
});
disciplineSchema.virtual("id").get(function () {
  return this._id;
});
module.exports = mongoose.model("Discipline", disciplineSchema);