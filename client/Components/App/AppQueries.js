import gql from "graphql-tag";

import App from "./App";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(App, {
  query: gql`
    query AppQuery {
      store {
        ...App_store
      }
    }
    ${App.fragments.store}
  `
});
