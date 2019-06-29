import gql from "graphql-tag";

import Sync from "./Sync";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(Sync, {
  query: gql`
    query SyncQuery {
      strava {
        ...Sync_strava
      }
    }
    ${Sync.fragments.strava}
  `
});
