import gql from "graphql-tag";

import PersonalGoalsForm from "./PersonalGoalsForm";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(PersonalGoalsForm, {
  query: gql`
    query PersonalGoalsFormQuery($username: String!) {
      store {
        id
        ...PersonalGoalsForm_store
      }
      user(username: $username) {
        _id
        ...PersonalGoalsForm_user
      }
    }
    ${PersonalGoalsForm.fragments.store}
    ${PersonalGoalsForm.fragments.user}
  `
});
