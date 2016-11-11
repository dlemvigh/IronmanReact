'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _graphqlCustomDatetype = require('graphql-custom-datetype');

var _graphqlCustomDatetype2 = _interopRequireDefault(_graphqlCustomDatetype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

    var type = _fromGlobalId.type;
    var id = _fromGlobalId.id;

    if (type == 'Store') {
        return _database2.default.getStore();
    } else if (type === 'User') {
        return _database2.default.getUser(id);
    } else if (type === 'Activity') {
        return _database2.default.getActivity(id);
    } else if (type === 'Discipline') {
        return _database2.default.getDiscipline(id);
    } else if (type === 'Summary') {
        return _database2.default.getSummary(id);
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
    }
    return null;
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;


var summaryType = new _graphql.GraphQLObjectType({
    name: 'Summary',
    fields: function fields() {
        return {
            _id: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
            },
            id: (0, _graphqlRelay.globalIdField)('Summary'),
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
    name: 'Activity',
    fields: function fields() {
        return {
            _id: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
            },
            id: (0, _graphqlRelay.globalIdField)('Activity'),
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

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ name: 'Activity', nodeType: activityType });

var activityConnection = _connectionDefinition.connectionType;
var activityEdge = _connectionDefinition.edgeType;


var disciplineType = new _graphql.GraphQLObjectType({
    name: 'Discipline',
    fields: function fields() {
        return {
            _id: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
            },
            id: (0, _graphqlRelay.globalIdField)('Discipline'),
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

var _connectionDefinition2 = (0, _graphqlRelay.connectionDefinitions)({ name: 'Discipline', nodeType: disciplineType });

var disciplineConnection = _connectionDefinition2.connectionType;
var disciplineEdge = _connectionDefinition2.edgeType;


var userType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: function fields() {
        return {
            _id: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
            },
            id: (0, _graphqlRelay.globalIdField)('User'),
            name: {
                type: _graphql.GraphQLString
            },
            username: {
                type: _graphql.GraphQLString
            },
            facebookId: {
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
                    return _database2.default.getCachedSummary(root._id, args.week, args.year);
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition3 = (0, _graphqlRelay.connectionDefinitions)({ name: 'User', nodeType: userType });

var userConnection = _connectionDefinition3.connectionType;
var userEdge = _connectionDefinition3.edgeType;


var storeType = new _graphql.GraphQLObjectType({
    name: 'Store',
    fields: function fields() {
        return {
            id: (0, _graphqlRelay.globalIdField)('Store'),
            echo: {
                type: _graphql.GraphQLString,
                resolve: function resolve() {
                    return 'hello';
                }
            },
            disciplines: {
                type: disciplineConnection,
                args: _graphqlRelay.connectionArgs,
                resolve: function resolve(_, args) {
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.getDisciplines(), args);
                }
            },
            users: {
                type: userConnection,
                args: _graphqlRelay.connectionArgs,
                resolve: function resolve(_, args) {
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.getUsers(), args);
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

var queryType = new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: function fields() {
        return {
            store: {
                type: storeType,
                resolve: function resolve() {
                    return _database2.default.getStore();
                }
            },
            user: {
                type: userType,
                args: {
                    username: {
                        name: "username",
                        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                    }
                },
                resolve: function resolve(root, params, options) {
                    return _database2.default.getUserByUsername(params.username);
                }
            },
            node: nodeField
        };
    }
});

var addActivityMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'AddActivity',
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
                var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(obj) {
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
                                    return _context.abrupt('return', { node: obj, cursor: cursorIndex });

                                case 6:
                                case 'end':
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
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(obj) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return _database2.default.getUser(obj.userId);

                                case 2:
                                    return _context2.abrupt('return', _context2.sent);

                                case 3:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                return function resolve(_x2) {
                    return _ref2.apply(this, arguments);
                };
            }()
        }
    },

    mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
        var userId = _ref3.userId;
        var disciplineId = _ref3.disciplineId;
        var distance = _ref3.distance;
        var date = _ref3.date;

        return _database2.default.addActivity(userId, disciplineId, distance, date);
    }
});

var removeActivityMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
    name: 'RemoveActivity',
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
                var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(obj) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return _database2.default.getUser(obj.userId);

                                case 2:
                                    return _context3.abrupt('return', _context3.sent);

                                case 3:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, undefined);
                }));

                return function resolve(_x3) {
                    return _ref4.apply(this, arguments);
                };
            }()
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref5) {
        var id = _ref5.id;

        return _database2.default.removeActivity(id);
    }
});

var mutationType = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: function fields() {
        return {
            addActivity: addActivityMutation,
            removeActivity: removeActivityMutation
        };
    }
});

exports.default = new _graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});