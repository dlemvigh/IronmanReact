import gql from "graphql-tag";

import Sync from "./Sync";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(Sync, {
  query: gql`
    query SyncQuery {
      store {
        id
        ...Sync_store
      }
      strava {
        ...Sync_strava
      }
    }
    ${Sync.fragments.store}
    ${Sync.fragments.strava}
  `
});
