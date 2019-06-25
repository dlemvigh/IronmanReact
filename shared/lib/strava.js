const strava = require("strava-v3");
const access_token = "a5640a5dc838a39fd7ab727c1747b91a65bcd144";

// strava.athlete.get({ access_token }, (err, payload, limits) => {
//   if (err) {
//     console.log("error", err);
//   } else {
//     console.log("data", payload, limits);
//   }
// });

strava.athlete.listActivities({ access_token }, (err, payload, limits) => {
  if (err) {
    console.log("error", err);
  } else {
    // console.log("data", payload, limits);
    console.log("data", payload.length, limits)
  }
});

const scopes = [
  "read",
  "read_all",
  "profile:read_all",
  "profile:write",
  "activity:read",
  "activity:read_all",
  "activity:write"
]

// console.log(strava.oauth.getRequestAccessURL({ scope: "read,activity:read" }));
const code = "3fbd5f29da46fb63b2ec68c260ed28b670727bde";
// strava.oauth.getToken(code, (err, payload, limits) => {
//   if (err){
//     console.log("error", err);
//   } else {
//     console.log("token", payload, limits);
//   }
// });