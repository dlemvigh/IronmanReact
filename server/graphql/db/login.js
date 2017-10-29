import LoginModel from "../../models/login";
import UserModel from "../../models/user";

export function getLogin(id) {
  return LoginModel.findById(id).exec(); 
}

export async function getUserByLogin(provider, providerUserId) {
  const login = await LoginModel.findOne({
    provider,
    providerUserId
  });
  if (login) {
    return await UserModel.findById(login.userId);
  }
}

export async function ensureLogin(username, provider, providerUserId) {
  const [login, user] = await Promise.all([
    LoginModel.findOne({
      provider,
      providerUserId
    }),
    UserModel.findOne({
      username
    })
  ]);

  if (login) { return user; }

  if (!user) { return; }

  await new LoginModel({ 
    userId: user._id,
    provider,
    providerUserId
  }).save();

  return user;
}
