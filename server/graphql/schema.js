const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} = require("graphql");
const {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  offsetToCursor,
  fromGlobalId,
  toGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} = require("graphql-relay");
const database = require("./database");
const CustomGraphQLDateType = require("graphql-custom-datetype");
const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);

    if (type == "Store") {
      return database.getStore();
    } else if (type === "User") {
      return database.getUser(id);
    } else if (type === "Activity") {
      return database.getActivity(id);
    } else if (type === "Discipline") {
      return database.getDiscipline(id);
    } else if (type === "Summary") {
      return database.getSummary(id);
    } else if (type === "Medals") {
      return database.getMedals(id);
    } else if (type == "Season") {
      return database.getSeason(id);
    } else if (type == "Login") {
      return database.getLogin(id);
    } else if (type == "PersonalGoal") {
      return database.getPersonalGoal(id);
    }

    return null;
  },
  obj => {
    if (obj instanceof database.StoreModel) {
      return storeType;
    } else if (obj instanceof database.UserModel) {
      return userType;
    } else if (obj instanceof database.ActivityModel) {
      return activityType;
    } else if (obj instanceof database.DisciplineModel) {
      return disciplineType;
    } else if (obj instanceof database.SummaryModel) {
      return summaryType;
    } else if (obj instanceof database.MedalsModel) {
      return medalsType;
    } else if (obj instanceof database.SeasonModel) {
      return seasonType;
    } else if (obj instanceof database.LoginModel) {
      return loginType;
    } else if (obj instanceof database.PersonalGoalModel) {
      return personalGoalType;
    }

    return null;
  }
);
const medalsType = new GraphQLObjectType({
  name: "Medals",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Medals"),
    gold: {
      type: GraphQLInt
    },
    goldWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    silver: {
      type: GraphQLInt
    },
    silverWeeks: {
      type: new GraphQLList(GraphQLInt)
    },
    bronze: {
      type: GraphQLInt
    },
    bronzeWeeks: {
      type: new GraphQLList(GraphQLInt)
    }
  })
});
const seasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Season"),
    name: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    from: {
      type: GraphQLInt
    },
    to: {
      type: GraphQLInt
    }
  })
});
const summaryType = new GraphQLObjectType({
  name: "Summary",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Summary"),
    user: {
      type: userType,
      resolve: obj => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    week: {
      type: GraphQLInt
    },
    year: {
      type: GraphQLInt
    },
    weekyear: {
      type: GraphQLInt,
      resolve: obj => `${obj.year}${obj.week < 10 ? "0" : ""}${obj.week}`
    }
  }),
  interfaces: [nodeInterface]
});
const activityType = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Activity"),
    discipline: {
      type: disciplineType,
      resolve: obj => database.getDiscipline(obj.disciplineId)
    },
    disciplineId: {
      type: GraphQLID
    },
    disciplineName: {
      type: GraphQLString
    },
    distance: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    date: {
      type: CustomGraphQLDateType
    },
    week: {
      type: GraphQLInt
    },
    year: {
      type: GraphQLInt
    },
    weekyear: {
      type: GraphQLInt,
      resolve: obj => `${obj.year}${obj.week < 10 ? "0" : ""}${obj.week}`
    },
    user: {
      type: userType,
      resolve: obj => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});
const {
  connectionType: activityConnection,
  edgeType: activityEdge
} = connectionDefinitions({
  name: "Activity",
  nodeType: activityType
});
const disciplineType = new GraphQLObjectType({
  name: "Discipline",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("Discipline"),
    name: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    },
    unit: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});
const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("User"),
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    },
    activities: {
      type: activityConnection,
      args: connectionArgs,
      resolve: (root, args) =>
        connectionFromPromisedArray(
          database.getActivities({
            userId: root._id
          }),
          args
        )
    },
    summary: {
      type: summaryType,
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
        return database.getWeekSummary(root._id, args.week, args.year);
      }
    },
    medals: {
      type: medalsType,
      resolve: root => {
        return database.getMedalsByUserId(root._id);
      }
    },
    personalGoals: {
      type: new GraphQLList(personalGoalType),
      resolve: root => {
        return database.getPersonalGoalsByUser(root._id);
      }
    }
  }),
  interfaces: [nodeInterface]
});
const loginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("User"),
    user: {
      type: userType,
      resolve: obj => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    provider: {
      type: GraphQLString
    },
    providerUserId: {
      type: GraphQLString
    }
  })
});
const personalGoalType = new GraphQLObjectType({
  name: "PersonalGoal",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: globalIdField("User"),
    user: {
      type: userType,
      resolve: obj => database.getUser(obj.userId)
    },
    userId: {
      type: GraphQLID
    },
    userName: {
      type: GraphQLString
    },
    discipline: {
      type: disciplineType,
      resolve: obj => database.getDiscipline(obj.disciplineId)
    },
    disciplineId: {
      type: GraphQLID
    },
    disciplineName: {
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
    },
    priority: {
      type: GraphQLInt
    }
  })
});
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
  }),
  interfaces: [nodeInterface]
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
    node: nodeField
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
      type: activityType,
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
      type: activityType,
      resolve: async ({ newActivity }) => newActivity
    },
    activityPrev: {
      type: activityType,
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
      type: activityType,
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
