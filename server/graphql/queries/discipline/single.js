import {Types} from 'mongoose';
import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import disciplineType from "../../types/discipline";
import getProjection from '../../get-projection';
import DisciplineModel from "../../../models/discipline";

export default {
    type: disciplineType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params, info, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return DisciplineModel
            .findById(params.id)
            .select(projection)
            .exec();
    }
};