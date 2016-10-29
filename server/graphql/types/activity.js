import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import CustomGraphQLDateType from "graphql-custom-datetype"
import disciplineType from "./discipline"
import DisciplineModel from "../../models/discipline";
import getProjection from '../get-projection';

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve: (root) => root._id
        },
        disciplineId: {
            type: GraphQLID
        },
        disciplineName: {
            type: GraphQLString
        },
        discipline: {
            type: disciplineType,
            resolve (root, params, info, options) {
                const projection = getProjection(options.fieldASTs[0]);
                return DisciplineModel
                    .findById(root.disciplineId)
                    .select(projection)
                    .exec();
            }
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
        // },
        // user: {
        //     type: userType,
        //     resolve: (root) => {
        //         root.userId
        //     }
        }
    })
});

console.log("act")

export default ActivityType;