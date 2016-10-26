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
    type: new GraphQLList(disciplineType),
    args: {},
    resolve (root, params, info, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return DisciplineModel
            .find()
            .select(projection)
            .exec();
    }
};