import MedalsModel from "../../models/medals";
import UserModel from "../../models/user";

export function getUser(id) {
  return UserModel.findById(id).exec();
}

export function getUserByUsername(username) {
  return UserModel.findOne({username}).exec();
}

export function getUsers() {
  return UserModel.find({}).exec();
}

export async function addUser(name, username) {
  const user = { name, username };
  const oldUser = await UserModel.findOne({name: username});
  if (oldUser) {
    throw "username already exists";
  }
  const newUser = await new UserModel(user).save();
  await populateMedals(newUser);
  return newUser;
}

export function populateMedals(user) {
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
