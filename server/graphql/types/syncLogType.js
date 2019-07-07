const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const CustomGraphQLDateType = require("graphql-custom-datetype");

const { mapSyncLog } = require("../database");

const syncLogType = new GraphQLObjectType({
  name: "SyncLog",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      type: GraphQLFloat
    },
    external_id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    distance: {
      type: GraphQLFloat
    },
    moving_time: {
      type: GraphQLInt
    },
    elapsed_time: {
      type: GraphQLInt
    },
    start_date: {
      type: CustomGraphQLDateType
    },
    start_date_local: {
      type: CustomGraphQLDateType
    },
    type: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    activity: {
      type: require("./activityType").activityType,
      resolve: obj => mapSyncLog(obj)
    }
  })
});

module.exports = syncLogType;
