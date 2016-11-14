import DisciplineModel from "../models/discipline";
import MedalsModel from "../models/medals";
import UserModel from "../models/user";

const disciplines = [
    { name: "run", score: 5, unit: "km" },
    { name: "swim", score: 25, unit: "km" },
    { name: "bike", score: 1, unit: "km" },
    { name: "caloric", score: .06, unit: "cal" },
    { name: "misc", score: 25, unit: "hours" },
];

const users = [
    { name: "David", username: "david" },
    { name: "Mads", username: "mads" },
    { name: "Sidsel", username: "sidsel" }
];

function populateMedals(userId, name){
    MedalsModel.findOne({ userId }, (err, result) => {
        if (err) {
            console.log("error", err);
        } else if (!result) {
            console.log("creating medals", name);
            new MedalsModel({
                userId,
                gold: 0,
                silver: 0,
                bronze: 0
            }).save();        
        }
    });
}

export function populate(){
    disciplines.forEach(disc => {
        DisciplineModel.findOne({
            name: disc.name
        }, (err, result) => {
            if (err) {
                console.log("error", err);
            } else if (!result) {
                console.log("creating", disc.name)
                new DisciplineModel(disc).save();
            }
        })
    });

    users.forEach(user => {        
        UserModel.findOne({
            name: user.name
        }, (err, result) => {
            if (err) {
                console.log("error", err);
            } else if (result) {
                populateMedals(result._id, user.name);
            }else{
                console.log("creating", user.name)
                new UserModel(user).save((err, newUser) => {
                    if (!err && newUser) {
                        populateMedals(newUser._id, user.name);
                    }
                });
            }
            
        })
    });
};
