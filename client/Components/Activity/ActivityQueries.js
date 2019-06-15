import gql from "graphql-tag";

import Activity from "./Activity";
import { withApollo } from "../Common/ApolloLoader";

// export default Activity;

export default withApollo(Activity, {
  query: gql`
    query ActivityQuery($username: String!) {
      store {
        ...Activity_store
      }
      user (username: $username) {
        ...Activity_user  
      }      
    }
    ${Activity.fragments.store}
    ${Activity.fragments.user}
  `
});
