import DisciplineModel from "../models/discipline";
import UserModel from "../models/user";

const disciplines = [
    { name: "run", score: 5, unit: "km" },
    { name: "swim", score: 25, unit: "km" },
    { name: "bike", score: 1, unit: "km" },
    { name: "caloric", score: .06, unit: "cal" },
    { name: "misc", score: 25, unit: "hours" },
];

const users = [
    { name: "David" },
    { name: "Mads" },
    { name: "Sidsel" }
];

export function populate(){
    disciplines.forEach(disc => {
        DisciplineModel.findOne({
            name: disc.name
        }, (err, result) => {
            if (err || result) {
                // console.log("discipline found")
            }else{
                console.log("creating", disc.name)
                new DisciplineModel(disc).save();
            }
        })
    });

    users.forEach(user => {
        UserModel.findOne({
            name: user.name
        }, (err, result) => {
            if (err || result) {
                // console.log("user found")
            }else{
                console.log("creating", user.name)
                new UserModel(user).save();
            }
        })
    });
};
