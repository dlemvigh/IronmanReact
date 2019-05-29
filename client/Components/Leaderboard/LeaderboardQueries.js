import gql from "graphql-tag";
import moment from "moment";

import Leaderboard from "./Leaderboard";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(Leaderboard, {
  query: gql`
    query LeaderboardQuery(
      $week: Int!, 
      $year: Int!,
      $currentWeekNo: Int!, 
      $currentWeekYear: Int!,
      $lastWeekNo: Int!, 
      $lastWeekYear: Int!
    ) {
      store {
        ...Leaderboard_store
      }
    }
    ${Leaderboard.fragments.store}
  `,
  variables: {
    week: moment().isoWeek(),
    year: moment().isoWeekYear(),
    currentWeekNo: moment().isoWeek(),
    currentWeekYear: moment().weekYear(),
    lastWeekNo: moment()
      .add(-7, "days")
      .isoWeek(),
    lastWeekYear: moment()
      .add(-7, "days")
      .weekYear()
  }
});
