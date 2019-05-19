import gql from "graphql-tag";
import moment from "moment";

import Leaderboard from "./Leaderboard";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(Leaderboard, {
  query: gql`
    query LeaderboardQuery($week: Int!, $year: Int!) {
      store {
        ...Leaderboard_store
      }
    }
    ${Leaderboard.fragments.store}
  `,
  variables: {
    week: moment().isoWeek(),
    year: moment().isoWeekYear()
  }
});
