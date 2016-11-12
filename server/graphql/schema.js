import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  offsetToCursor,
  fromGlobalId,
  toGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from "graphql-relay";

import database from './database';

import CustomGraphQLDateType from "graphql-custom-datetype"

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type == 'Store') {
        return database.getStore();
    } else if (type === 'User') {
      return database.getUser(id);
    } else if (type === 'Activity') {
      return database.getActivity(id);
    } else if (type === 'Discipline') {
      return database.getDiscipline(id);
    } else if (type === 'Summary') {
      return database.getSummary(id)
    }
    return null;
  },
  (obj) => {
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
    }
    return null;
  }
);

const summaryType = new GraphQLObjectType({
    name: 'Summary',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        id: globalIdField('Summary'),
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

        }
    }),
    interfaces: [nodeInterface]
})

const activityType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        id: globalIdField('Activity'),
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
        userId: {
            type: GraphQLID
        },
        userName: {
            type: GraphQLString
        }
    }),
    interfaces: [nodeInterface]
});

const { connectionType: activityConnection, edgeType: activityEdge } = connectionDefinitions({ name: 'Activity', nodeType: activityType });

const disciplineType = new GraphQLObjectType({
    name: 'Discipline',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        id: globalIdField('Discipline'),
        name: {
            type: GraphQLString
        },
        score: {
            type: GraphQLFloat
        },
        unit: {
            type: GraphQLString
        },
    }),
    interfaces: [nodeInterface]
});

const { connectionType: disciplineConnection, edgeType: disciplineEdge } = connectionDefinitions({ name: 'Discipline', nodeType: disciplineType });

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        id: globalIdField('User'),
        name: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        facebookId: {
            type: GraphQLString
        },
        active: {
            type: GraphQLBoolean
        },
        activities: {
            type: activityConnection,
            args: connectionArgs,
            resolve: (root, args) => connectionFromPromisedArray(database.getActivities({userId: root._id}), args)
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
                return database.getCachedSummary(root._id, args.week, args.year);
            }
        }
    }),
    interfaces: [nodeInterface]
});

const { connectionType: userConnection, edgeType: userEdge } = connectionDefinitions({ name: 'User', nodeType: userType });

const storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: globalIdField('Store'),
        echo: {
            type: GraphQLString,
            resolve: () => 'hello'
        },
        disciplines: {
            type: disciplineConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(database.getDisciplines(), args)
        },
        users: {
            type: userConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(database.getUsers(), args)
        },
    }),
    interfaces: [nodeInterface]
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    store: {
      type: storeType,
      resolve: () => database.getStore()
    },
    user: {
        type: userType,
        args: {
            username: {
                name: "username",
                type:new GraphQLNonNull(GraphQLString)
            }        
        },
        resolve (root, params, options) { return database.getUserByUsername(params.username) }
    },
    node: nodeField
  })
});

const addActivityMutation = mutationWithClientMutationId({
  name: 'AddActivity',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    disciplineId: { type: new GraphQLNonNull(GraphQLString) },
    distance: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    activityEdge: {
      type: activityEdge,
      resolve: async (obj) => {
        const activities = await database.getActivities({userId: obj.userId});
        const index = activities.findIndex(x => x._id === obj._id);
        const cursorIndex = offsetToCursor(index);
        return { node: obj, cursor: cursorIndex };
      }
    },
    user: {
        type: userType,
        resolve: async (obj) => {
            return await database.getUser(obj.userId)
        }
    }
  },

  mutateAndGetPayload: ({ userId, disciplineId, distance, date }) => {
      return database.addActivity(userId, disciplineId, distance, date); 
    }
});

const removeActivityMutation = mutationWithClientMutationId({
    name: 'RemoveActivity',
    inputFields: {
        id: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
        removedActivityId: {
            type: GraphQLString,
            resolve: (obj) => {
                const globalId = toGlobalId("Activity", obj._id);
                return globalId;
            } 
        },
        user: {
            type: userType,
            resolve: async (obj) => {
                return await database.getUser(obj.userId)
            }
        }
    },
    mutateAndGetPayload: ({id}) => {
        return database.removeActivity(id);
    }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addActivity: addActivityMutation,
    removeActivity: removeActivityMutation
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
