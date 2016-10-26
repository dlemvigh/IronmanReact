import {Types} from 'mongoose';
import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import userType from "../../types/user";
import getProjection from '../../get-projection';
import UserModel from "../../../models/user";

export default {
    type: new GraphQLList(userType),
    args: {},
    resolve (root, params, info, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return UserModel
            .find()
            .select(projection)
            .exec();
    }
};