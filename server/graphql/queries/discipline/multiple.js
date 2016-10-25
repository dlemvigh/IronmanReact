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
    resolve (root, params, options) {
        console.log("resolve", DisciplineModel.find().exec());
        // const projection = getProjection(options.fieldASTs[0]);
        var foo = DisciplineModel
            .find()
            // .select(projection)
            .exec();
            foo.then(() => console.log("foo"))
        return foo;
    }
};