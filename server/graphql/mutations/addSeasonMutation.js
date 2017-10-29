import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import {
  mutationWithClientMutationId
} from "graphql-relay";

import database from '../database';
import seasonType from '../types/seasonType';

const addSeasonMutation = mutationWithClientMutationId({
  name: "AddSeason",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString)},
    url: { type: new GraphQLNonNull(GraphQLString)},
    from: { type: new GraphQLNonNull(GraphQLInt)},
    to: { type: new GraphQLNonNull(GraphQLInt)}
  },
  outputFields: {
    season: {
      type: seasonType,
      resolve: (obj) => {
        return obj;
      }
    }
  },
  mutateAndGetPayload: ({name, url, from, to}) => {
    return database.addSeason(name, url, from, to);
  }
});

export default addSeasonMutation;