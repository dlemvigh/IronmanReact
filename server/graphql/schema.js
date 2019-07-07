const stravaType = require("./stravaType");
const summaryType = require("./summaryType");
const { activityEdge } = require("./activityType");
const userType = require("./userType");
const disciplineType = require("./disciplineType");
const seasonType = require("./seasonType");
const medalsType = require("./medalsType");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const {
  offsetToCursor,
  toGlobalId,
  globalIdField,
  mutationWithClientMutationId
} = require("graphql-relay");

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
      type: new GraphQLList(disciplineType),
      resolve: () => database.getDisciplines()
    },
    users: {
      type: new GraphQLList(userType),
      resolve: () => database.getUsers()
    },
    currentSeason: {
      type: seasonType,
      resolve: () => {
        return database.getCurrentSeason();
      }
    },
    allSeasons: {
      type: new GraphQLList(seasonType),
      resolve: () => {
        return database.getSeasons();
      }
    },
    allSummaries: {
      type: new GraphQLList(summaryType),
      resolve: () => {
        return database.getAllWeekSummaries();
      }
    },
    summary: {
      type: new GraphQLList(summaryType),
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
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    store: {
      type: storeType,
      resolve: () => database.getStore()
    },
    season: {
      type: seasonType,
      args: {
        id: {
          name: "id",
          type: GraphQLString
        }
      },

      resolve(root, params) {
        return database.getSeason(params.id);
      }
    },
    user: {
      type: userType,
      args: {
        id: {
          name: "id",
          type: GraphQLString
        },
        username: {
          name: "username",
          type: GraphQLString
        }
      },

      resolve(root, params) {
        if (params.id) {
          return database.getUser(params.id);
        }

        if (params.username) {
          return database.getUserByUsername(params.username);
        }

        throw new Error("No arguments supplied to get user");
      }
    },
    strava: {
      type: stravaType,
      resolve: () => true
    }
  })
});
const addActivityMutation = mutationWithClientMutationId({
  name: "AddActivity",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    disciplineId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    distance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    activity: {
      type: require("./activityType").activityType,
      resolve: async obj => {
        return obj;
      }
    },
    activityEdge: {
      type: activityEdge,
      resolve: async obj => {
        const activities = await database.getActivities({
          userId: obj.userId
        });
        const index = activities.findIndex(x => x._id === obj._id);
        const cursorIndex = offsetToCursor(index);
        return {
          node: obj,
          cursor: cursorIndex
        };
      }
    },
    user: {
      type: userType,
      resolve: obj => {
        return database.getUser(obj.userId);
      }
    },
    medals: {
      type: new GraphQLList(medalsType),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    summary: {
      type: new GraphQLList(summaryType),
      resolve: async obj => {
        const summary = await database.getAllSummaries(obj.week, obj.year);
        return summary;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ userId, disciplineId, distance, date }) => {
    return database.addActivity(userId, disciplineId, distance, date);
  }
});
const editActivityMutation = mutationWithClientMutationId({
  name: "EditActivity",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    disciplineId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    distance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    activity: {
      type: require("./activityType").activityType,
      resolve: async ({ newActivity }) => newActivity
    },
    activityPrev: {
      type: require("./activityType").activityType,
      resolve: async ({ oldActivity }) => oldActivity
    },
    user: {
      type: userType,
      resolve: ({ newActivity }) => {
        return database.getUser(newActivity.userId);
      }
    },
    medals: {
      type: new GraphQLList(medalsType),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    summary: {
      type: new GraphQLList(summaryType),
      resolve: async ({ newActivity }) => {
        const summary = await database.getAllSummaries(
          newActivity.week,
          newActivity.year
        );
        return summary;
      }
    },
    summaryPrev: {
      type: new GraphQLList(summaryType),
      resolve: async ({ oldActivity }) => {
        const summary = await database.getAllSummaries(
          oldActivity.week,
          oldActivity.year
        );
        return summary;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ id, userId, disciplineId, distance, date }) => {
    return database.editActivity(id, userId, disciplineId, distance, date);
  }
});
const removeActivityMutation = mutationWithClientMutationId({
  name: "RemoveActivity",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    removedActivityId: {
      type: GraphQLString,
      resolve: obj => {
        const globalId = toGlobalId("Activity", obj._id);
        return globalId;
      }
    },
    activity: {
      type: require("./activityType").activityType,
      resolve: activity => activity
    },
    summary: {
      type: new GraphQLList(summaryType),
      resolve: activity => {
        return database.getAllSummaries(activity.week, activity.year);
      }
    },
    user: {
      type: userType,
      resolve: obj => {
        return database.getUser(obj.userId);
      }
    },
    medals: {
      type: new GraphQLList(medalsType),
      resolve: () => {
        return database.getAllMedals();
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ id }) => {
    return database.removeActivity(id);
  }
});
const addUserMutation = mutationWithClientMutationId({
  name: "AddUser",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: obj => {
        return obj;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ name, username }) => {
    return database.addUser(name, username);
  }
});

const removeUserMutation = mutationWithClientMutationId({
  name: "RemoveUser",
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: obj => {
        return obj;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ username }) => {
    return database.removeUser(username);
  }
});

const addSeasonMutation = mutationWithClientMutationId({
  name: "AddSeason",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString)
    },
    from: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    to: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  outputFields: {
    season: {
      type: seasonType,
      resolve: obj => {
        return obj;
      }
    },
    store: {
      type: storeType,
      resolve: () => {
        return database.getStore();
      }
    }
  },
  mutateAndGetPayload: ({ name, url, from, to }) => {
    return database.addSeason(name, url, from, to);
  }
});
const ensureLoginMutation = mutationWithClientMutationId({
  name: "EnsureLogin",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    provider: {
      type: new GraphQLNonNull(GraphQLString)
    },
    providerUserId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: obj => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({ username, provider, providerUserId }) => {
    return database.ensureLogin(username, provider, providerUserId);
  }
});
const personalGoalInputType = new GraphQLInputObjectType({
  name: "PersonalGoalInput",
  fields: () => ({
    disciplineId: {
      type: GraphQLString
    },
    count: {
      type: GraphQLInt
    },
    dist: {
      type: GraphQLFloat
    },
    score: {
      type: GraphQLInt
    }
  })
});
const setPersonalGoalsMutation = mutationWithClientMutationId({
  name: "SetPersonalGoals",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    goals: {
      type: new GraphQLList(personalGoalInputType)
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: obj => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({ userId, goals }) => {
    return database.setPersonalGoals(userId, goals);
  }
});
const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addActivity: addActivityMutation,
    editActivity: editActivityMutation,
    removeActivity: removeActivityMutation,
    addUser: addUserMutation,
    removeUser: removeUserMutation,
    addSeason: addSeasonMutation,
    ensureLogin: ensureLoginMutation,
    setPersonalGoals: setPersonalGoalsMutation
  })
});
module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
