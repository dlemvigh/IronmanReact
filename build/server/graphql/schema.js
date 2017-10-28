"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require("graphql");

var _graphqlRelay = require("graphql-relay");

var _database = require("./database");

var _database2 = _interopRequireDefault(_database);

var _graphqlCustomDatetype = require("graphql-custom-datetype");

var _graphqlCustomDatetype2 = _interopRequireDefault(_graphqlCustomDatetype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId),
      type = _fromGlobalId.type,
      id = _fromGlobalId.id;

  if (type == "Store") {
    return _database2.default.getStore();
  } else if (type === "User") {
    return _database2.default.getUser(id);
  } else if (type === "Activity") {
    return _database2.default.getActivity(id);
  } else if (type === "Discipline") {
    return _database2.default.getDiscipline(id);
  } else if (type === "Summary") {
    return _database2.default.getSummary(id);
  } else if (type === "Medals") {
    return _database2.default.getMedals(id);
  } else if (type == "Season") {
    return _database2.default.getSeason(id);
  } else if (type == "Login") {
    return _database2.default.getLogin(id);
  } else if (type == "PersonalGoal") {
    return _database2.default.getPersonalGoal(id);
  }
  return null;
}, function (obj) {
  if (obj instanceof _database2.default.StoreModel) {
    return storeType;
  } else if (obj instanceof _database2.default.UserModel) {
    return userType;
  } else if (obj instanceof _database2.default.ActivityModel) {
    return activityType;
  } else if (obj instanceof _database2.default.DisciplineModel) {
    return disciplineType;
  } else if (obj instanceof _database2.default.SummaryModel) {
    return summaryType;
  } else if (obj instanceof _database2.default.MedalsModel) {
    return medalsType;
  } else if (obj instanceof _database2.default.SeasonModel) {
    return seasonType;
  } else if (obj instanceof _database2.default.LoginModel) {
    return loginType;
  } else if (obj instanceof _database2.default.PersonalGoalModel) {
    return personalGoalType;
  }
  return null;
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

var medalsType = new _graphql.GraphQLObjectType({
  name: "Medals",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("Medals"),
      gold: {
        type: _graphql.GraphQLInt
      },
      goldWeeks: {
        type: new _graphql.GraphQLList(_graphql.GraphQLInt)
      },
      silver: {
        type: _graphql.GraphQLInt
      },
      silverWeeks: {
        type: new _graphql.GraphQLList(_graphql.GraphQLInt)
      },
      bronze: {
        type: _graphql.GraphQLInt
      },
      bronzeWeeks: {
        type: new _graphql.GraphQLList(_graphql.GraphQLInt)
      }
    };
  }
});

var seasonType = new _graphql.GraphQLObjectType({
  name: "Season",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("Season"),
      name: {
        type: _graphql.GraphQLString
      },
      url: {
        type: _graphql.GraphQLString
      },
      from: {
        type: _graphql.GraphQLInt
      },
      to: {
        type: _graphql.GraphQLInt
      }
    };
  }
});

var summaryType = new _graphql.GraphQLObjectType({
  name: "Summary",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("Summary"),
      user: {
        type: userType,
        resolve: function resolve(obj) {
          return _database2.default.getUser(obj.userId);
        }
      },
      userId: {
        type: _graphql.GraphQLID
      },
      userName: {
        type: _graphql.GraphQLString
      },
      score: {
        type: _graphql.GraphQLFloat
      },
      week: {
        type: _graphql.GraphQLInt
      },
      year: {
        type: _graphql.GraphQLInt

      }
    };
  },
  interfaces: [nodeInterface]
});

var activityType = new _graphql.GraphQLObjectType({
  name: "Activity",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("Activity"),
      discipline: {
        type: disciplineType,
        resolve: function resolve(obj) {
          return _database2.default.getDiscipline(obj.disciplineId);
        }
      },
      disciplineId: {
        type: _graphql.GraphQLID
      },
      disciplineName: {
        type: _graphql.GraphQLString
      },
      distance: {
        type: _graphql.GraphQLFloat
      },
      unit: {
        type: _graphql.GraphQLString
      },
      score: {
        type: _graphql.GraphQLFloat
      },
      date: {
        type: _graphqlCustomDatetype2.default
      },
      week: {
        type: _graphql.GraphQLInt
      },
      year: {
        type: _graphql.GraphQLInt
      },
      user: {
        type: userType,
        resolve: function resolve(obj) {
          return _database2.default.getUser(obj.userId);
        }
      },
      userId: {
        type: _graphql.GraphQLID
      },
      userName: {
        type: _graphql.GraphQLString
      }
    };
  },
  interfaces: [nodeInterface]
});

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ name: "Activity", nodeType: activityType }),
    activityConnection = _connectionDefinition.connectionType,
    activityEdge = _connectionDefinition.edgeType;

var disciplineType = new _graphql.GraphQLObjectType({
  name: "Discipline",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("Discipline"),
      name: {
        type: _graphql.GraphQLString
      },
      score: {
        type: _graphql.GraphQLFloat
      },
      unit: {
        type: _graphql.GraphQLString
      }
    };
  },
  interfaces: [nodeInterface]
});

var userType = new _graphql.GraphQLObjectType({
  name: "User",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("User"),
      name: {
        type: _graphql.GraphQLString
      },
      username: {
        type: _graphql.GraphQLString
      },
      active: {
        type: _graphql.GraphQLBoolean
      },
      activities: {
        type: activityConnection,
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(root, args) {
          return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.getActivities({ userId: root._id }), args);
        }
      },
      summary: {
        type: summaryType,
        args: {
          week: {
            name: "week",
            type: _graphql.GraphQLInt
          },
          year: {
            name: "year",
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return _database2.default.getWeekSummary(root._id, args.week, args.year);
        }
      },
      medals: {
        type: medalsType,
        resolve: function resolve(root) {
          return _database2.default.getMedalsByUserId(root._id);
        }
      },
      personalGoals: {
        type: new _graphql.GraphQLList(personalGoalType),
        resolve: function resolve(root) {
          return _database2.default.getPersonalGoalsByUser(root._id);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

var loginType = new _graphql.GraphQLObjectType({
  name: "Login",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("User"),
      user: {
        type: userType,
        resolve: function resolve(obj) {
          return _database2.default.getUser(obj.userId);
        }
      },
      userId: {
        type: _graphql.GraphQLID
      },
      provider: {
        type: _graphql.GraphQLString
      },
      providerUserId: {
        type: _graphql.GraphQLString
      }
    };
  }
});

var personalGoalType = new _graphql.GraphQLObjectType({
  name: "PersonalGoal",
  fields: function fields() {
    return {
      _id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      id: (0, _graphqlRelay.globalIdField)("User"),
      user: {
        type: userType,
        resolve: function resolve(obj) {
          return _database2.default.getUser(obj.userId);
        }
      },
      userId: {
        type: _graphql.GraphQLID
      },
      userName: {
        type: _graphql.GraphQLString
      },
      discipline: {
        type: disciplineType,
        resolve: function resolve(obj) {
          return _database2.default.getDiscipline(obj.disciplineId);
        }
      },
      disciplineId: {
        type: _graphql.GraphQLID
      },
      disciplineName: {
        type: _graphql.GraphQLString
      },
      count: {
        type: _graphql.GraphQLInt
      },
      dist: {
        type: _graphql.GraphQLFloat
      },
      score: {
        type: _graphql.GraphQLInt
      },
      priority: {
        type: _graphql.GraphQLInt
      }
    };
  }
});

var storeType = new _graphql.GraphQLObjectType({
  name: "Store",
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)("Store"),
      echo: {
        type: _graphql.GraphQLString,
        resolve: function resolve() {
          return "hello";
        }
      },
      disciplines: {
        type: new _graphql.GraphQLList(disciplineType),
        resolve: function resolve() {
          return _database2.default.getDisciplines();
        }
      },
      users: {
        type: new _graphql.GraphQLList(userType),
        resolve: function resolve() {
          return _database2.default.getUsers();
        }
      },
      currentSeason: {
        type: seasonType,
        resolve: function resolve() {
          return _database2.default.getCurrentSeason();
        }
      },
      allSeasons: {
        type: new _graphql.GraphQLList(seasonType),
        resolve: function resolve() {
          return _database2.default.getSeasons();
        }
      },
      allSummaries: {
        type: new _graphql.GraphQLList(summaryType),
        resolve: function resolve() {
          return _database2.default.getAllWeekSummaries();
        }
      },
      summary: {
        type: new _graphql.GraphQLList(summaryType),
        args: {
          week: {
            name: "week",
            type: _graphql.GraphQLInt
          },
          year: {
            name: "year",
            type: _graphql.GraphQLInt
          }
        },
        resolve: function resolve(root, args) {
          return _database2.default.getAllSummaries(args.week, args.year);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

var queryType = new _graphql.GraphQLObjectType({
  name: "Query",
  fields: function fields() {
    return {
      store: {
        type: storeType,
        resolve: function resolve() {
          return _database2.default.getStore();
        }
      },
      season: {
        type: seasonType,
        args: {
          id: {
            name: "id",
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, params) {
          return _database2.default.getSeason(params.id);
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: "id",
            type: _graphql.GraphQLString
          },
          username: {
            name: "username",
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, params) {
          if (params.id) {
            return _database2.default.getUser(params.id);
          }
          if (params.username) {
            return _database2.default.getUserByUsername(params.username);
          }
          throw new Error("No arguments supplied to get user");
        }
      },
      node: nodeField
    };
  }
});

var addActivityMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "AddActivity",
  inputFields: {
    userId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    disciplineId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    distance: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat) },
    date: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },

  outputFields: {
    activityEdge: {
      type: activityEdge,
      resolve: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj) {
          var activities, index, cursorIndex;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _database2.default.getActivities({ userId: obj.userId });

                case 2:
                  activities = _context.sent;
                  index = activities.findIndex(function (x) {
                    return x._id === obj._id;
                  });
                  cursorIndex = (0, _graphqlRelay.offsetToCursor)(index);
                  return _context.abrupt("return", { node: obj, cursor: cursorIndex });

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function resolve(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    user: {
      type: userType,
      resolve: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _database2.default.getUser(obj.userId);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    },
    medals: {
      type: new _graphql.GraphQLList(medalsType),
      resolve: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _database2.default.getAllMedals();

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve() {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    store: {
      type: storeType,
      resolve: function resolve() {
        return _database2.default.getStore();
      }
    }
  },

  mutateAndGetPayload: function mutateAndGetPayload(_ref4) {
    var userId = _ref4.userId,
        disciplineId = _ref4.disciplineId,
        distance = _ref4.distance,
        date = _ref4.date;

    return _database2.default.addActivity(userId, disciplineId, distance, date);
  }
});

var editActivityMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "EditActivity",
  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    userId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    disciplineId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    distance: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLFloat) },
    date: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },

  outputFields: {
    activity: {
      type: activityType,
      resolve: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(obj) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", obj);

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function resolve(_x3) {
          return _ref5.apply(this, arguments);
        };
      }()
    },
    user: {
      type: userType,
      resolve: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(obj) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return _database2.default.getUser(obj.userId);

                case 2:
                  return _context5.abrupt("return", _context5.sent);

                case 3:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        }));

        return function resolve(_x4) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    medals: {
      type: new _graphql.GraphQLList(medalsType),
      resolve: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _database2.default.getAllMedals();

                case 2:
                  return _context6.abrupt("return", _context6.sent);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        }));

        return function resolve() {
          return _ref7.apply(this, arguments);
        };
      }()
    },
    store: {
      type: storeType,
      resolve: function resolve() {
        return _database2.default.getStore();
      }
    }
  },

  mutateAndGetPayload: function mutateAndGetPayload(_ref8) {
    var id = _ref8.id,
        userId = _ref8.userId,
        disciplineId = _ref8.disciplineId,
        distance = _ref8.distance,
        date = _ref8.date;

    return _database2.default.editActivity(id, userId, disciplineId, distance, date);
  }
});

var removeActivityMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "RemoveActivity",
  inputFields: {
    id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    removedActivityId: {
      type: _graphql.GraphQLString,
      resolve: function resolve(obj) {
        var globalId = (0, _graphqlRelay.toGlobalId)("Activity", obj._id);
        return globalId;
      }
    },
    user: {
      type: userType,
      resolve: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(obj) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _database2.default.getUser(obj.userId);

                case 2:
                  return _context7.abrupt("return", _context7.sent);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        }));

        return function resolve(_x5) {
          return _ref9.apply(this, arguments);
        };
      }()
    },
    medals: {
      type: new _graphql.GraphQLList(medalsType),
      resolve: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return _database2.default.getAllMedals();

                case 2:
                  return _context8.abrupt("return", _context8.sent);

                case 3:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, undefined);
        }));

        return function resolve() {
          return _ref10.apply(this, arguments);
        };
      }()
    },
    store: {
      type: storeType,
      resolve: function resolve() {
        return _database2.default.getStore();
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref11) {
    var id = _ref11.id;

    return _database2.default.removeActivity(id);
  }
});

var addUserMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "AddUser",
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    username: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: function resolve(obj) {
        return obj;
      }
    },
    store: {
      type: storeType,
      resolve: function resolve() {
        return _database2.default.getStore();
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref12) {
    var name = _ref12.name,
        username = _ref12.username;

    return _database2.default.addUser(name, username);
  }
});

var addSeasonMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "AddSeason",
  inputFields: {
    name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    url: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    from: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
    to: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) }
  },
  outputFields: {
    season: {
      type: seasonType,
      resolve: function resolve(obj) {
        return obj;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref13) {
    var name = _ref13.name,
        url = _ref13.url,
        from = _ref13.from,
        to = _ref13.to;

    return _database2.default.addSeason(name, url, from, to);
  }
});

var ensureLoginMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "EnsureLogin",
  inputFields: {
    username: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    provider: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
    providerUserId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: function resolve(obj) {
        return obj;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref14) {
    var username = _ref14.username,
        provider = _ref14.provider,
        providerUserId = _ref14.providerUserId;

    return _database2.default.ensureLogin(username, provider, providerUserId);
  }
});

var personalGoalInputType = new _graphql.GraphQLInputObjectType({
  name: "PersonalGoalInput",
  fields: function fields() {
    return {
      disciplineId: { type: _graphql.GraphQLString },
      count: { type: _graphql.GraphQLInt },
      dist: { type: _graphql.GraphQLFloat },
      score: { type: _graphql.GraphQLInt }
    };
  }
});

var setPersonalGoalsMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: "SetPersonalGoals",
  inputFields: {
    userId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
    goals: { type: new _graphql.GraphQLList(personalGoalInputType) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: function resolve(obj) {
        return obj;
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref15) {
    var userId = _ref15.userId,
        goals = _ref15.goals;

    return _database2.default.setPersonalGoals(userId, goals);
  }
});

var mutationType = new _graphql.GraphQLObjectType({
  name: "Mutation",
  fields: function fields() {
    return {
      addActivity: addActivityMutation,
      editActivity: editActivityMutation,
      removeActivity: removeActivityMutation,
      addUser: addUserMutation,
      addSeason: addSeasonMutation,
      ensureLogin: ensureLoginMutation,
      setPersonalGoals: setPersonalGoalsMutation
    };
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});