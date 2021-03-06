const DisciplineModel = require("../models/discipline");
const MedalsModel = require("../models/medals");
const UserModel = require("../models/user");
const SeasonModel = require("../models/season");

const disciplines = [
  { name: "run", score: 5, unit: "km", order: 1 },
  { name: "bike", score: 1, unit: "km", order: 2 },
  { name: "swim", score: 25, unit: "km", order: 3 },
  { name: "caloric", score: .06, unit: "cal", order: 4 },
  { name: "misc", score: 25, unit: "hours", order: 5 },
];

const users = [
  { name: "David", username: "david" },
  { name: "Mads", username: "mads" },
  { name: "Sidsel", username: "sidsel" }
];

const seasons = [
  // { name: "Spring 2017", url: "spring2017", from: 201701, to: 201720 },
  // { name: "Fall 2017", url: "spring2017", from: 201730, to: 201750 }
];

function populateDisciplines(){
  disciplines.forEach(disc => {
    DisciplineModel.findOne({
      name: disc.name
    }, (err, result) => {
      if (err) {
        console.err("error finding discipline", disc.name);
      }else if (!result) {
        console.log("creating", disc.name);
        new DisciplineModel(disc).save();
      }
    });
  });    
}

function populateUsers() {
  users.forEach(user => {
    UserModel.findOne({
      name: user.name
    }, (err, result) => {
      if (err){
        console.log("error finding user", user.name);
      } else if (!result) {
        console.log("creating", user.name);
        new UserModel(user).save((err2, result2) => {
          if (err2) {
            console.log("error adding user", user.name);
          }else{
            populateMedals(result2);
          }
        });
      }else{
        populateMedals(result);
      }
    });
  });
}

function populateMedals(user) {
  MedalsModel.findOne({
    userId: user._id,
  }, (err, result) => {
    if (err) {
      console.log("error finding medal");
    } else if (!result) {
      const medal = {
        userId: user._id,
        userName: user.name,
        gold: 0,
        silver: 0,
        bronze: 0                
      };
      new MedalsModel(medal).save((err2) => {
        if (err2) {
          console.log("error saving medal", err2);
        }
      });
    }
  });
}

function populateSeasons(){
  seasons.forEach(season => {
    SeasonModel.findOne({
      name: season.name
    }, (err, result) => {
      if (err) {
        console.error("error finding season", season.name);
      }else if (!result) {
        console.log("creating", season.name);
        new SeasonModel(season).save();
      }
    });
  });
}

function populate(){
  populateDisciplines();
  populateUsers();
  populateSeasons();
}

module.exports = { populate };