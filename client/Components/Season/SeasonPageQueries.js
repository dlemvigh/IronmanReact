import gql from "graphql-tag";

import SeasonPage from "./SeasonPage";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(SeasonPage, {
  query: gql`
    query SeasonPageQuery($id: String) {
      store {
        id
        ...SeasonPage_store
      }
      season(id: $id) {
        id
        ...SeasonPage_season
      }
    }
    ${SeasonPage.fragments.store}
    ${SeasonPage.fragments.season}
  `
});
