const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const database = require("./database");

const storeType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    id: globalIdField("Store"),
    echo: {
      type: GraphQLString,
      resolve: () => "hello"
    },
    disciplines: {
      type: new GraphQLList(require("./disciplineType")),
      resolve: () => database.getDisciplines()
    },
    users: {
      type: new GraphQLList(require("./userType")),
      resolve: () => database.getUsers()
    },
    currentSeason: {
      type: require("./seasonType"),
      resolve: () => {
        return database.getCurrentSeason();
      }
    },
    allSeasons: {
      type: new GraphQLList(require("./seasonType")),
      resolve: () => {
        return database.getSeasons();
      }
    },
    allSummaries: {
      type: new GraphQLList(require("./summaryType")),
      resolve: () => {
        return database.getAllWeekSummaries();
      }
    },
    summary: {
      type: new GraphQLList(require("./summaryType")),
      args: {
        week: {
          name: "week",
          type: GraphQLInt
        },
        year: {
          name: "year",
          type: GraphQLInt
        }
      },
      resolve: (root, args) => {
        return database.getAllSummaries(args.week, args.year);
      }
    }
  })
});

module.exports = storeType;
