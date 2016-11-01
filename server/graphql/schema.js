import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  fromGlobalId,
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
    }
    return null;
  }
);

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
        facebookId: {
            type: GraphQLString
        },
        active: {
            type: GraphQLBoolean
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
        activities: {
            type: activityConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(database.getActivities(), args)
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
        const activities = await database.getActivities();
        const cursorId = cursorForObjectInConnection(activities, obj);
        return { node: obj, cursor: cursorId };
      }
    },
    store: {
      type: storeType,
      resolve: () => database.getStore()
    }
  },

  mutateAndGetPayload: ({ userId, disciplineId, distance, date }) => {console.log(arguments); return database.addActivity(userId, disciplineId, distance, date)}
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addActivity: addActivityMutation
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

