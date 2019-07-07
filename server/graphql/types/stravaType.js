const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const strava = require("strava-v3");

const database = require("../database");

const stravaType = new GraphQLObjectType({
  name: "Strava",
  fields: () => ({
    getRequestAccessURL: {
      type: GraphQLString,
      resolve: () =>
        strava.oauth.getRequestAccessURL({ scope: "read,activity:read" })
    },
    getToken: {
      type: GraphQLString,
      args: {
        code: {
          name: "Code",
          type: GraphQLString
        }
      },
      resolve(root, { code }) {
        return new Promise((resolve, reject) => {
          strava.oauth.getToken(code, (err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(payload.access_token);
            }
          });
        });
      }
    },
    syncLog: {
      type: new GraphQLList(require("./syncLogType")),
      resolve() {
        return database.getSyncLog();
      }
    },
    listActivities: {
      type: GraphQLString,
      args: {
        access_token: {
          name: "Access Token",
          type: GraphQLString
        }
      },
      resolve(root, { access_token }) {
        return new Promise((resolve, reject) => {
          strava.athlete.listActivities(
            { access_token },
            async (err, payload) => {
              if (err) {
                reject(err);
              } else {
                await database.saveSyncLog(payload);
                resolve(JSON.stringify(payload, null, 2));
              }
            }
          );
        });
      }
    }
  })
});

module.exports = stravaType;
