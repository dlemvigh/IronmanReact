import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const PERSONAL_GOALS_FRAGMENT = gql`
  fragment PersonalGoalsFragment_user on User {
    personalGoals {
      id
      _id
      count
      discipline {
        id
        name
        score
        unit
      }
      disciplineId
      disciplineName
      dist
      score
    }
  }
`;

const UPDATE_PERSONAL_GOALS = gql`
  mutation UpdatePersonalGoals($input: SetPersonalGoalsInput!) {
    setPersonalGoals(input: $input) {
      user {
        ...PersonalGoalsFragment_user
      }
    }
  }
  ${PERSONAL_GOALS_FRAGMENT}
`;

const QUERY_PERSONAL_GOALS = gql`
  query GetPersonalGoals($username: String!) {
    user(username: $username) {
      id
      ...PersonalGoalsFragment_user
    }
  }
  ${PERSONAL_GOALS_FRAGMENT}
`;

export function withSetPersonalGoals(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={UPDATE_PERSONAL_GOALS}
      update={(cache, { data: { setPersonalGoals }}) => {
        const username = props.user.username;
        const { user } = cache.readQuery({
          query: QUERY_PERSONAL_GOALS,
          variables: { username }
        });

        user.personalGoals = [...setPersonalGoals.user.personalGoals];
        
        cache.writeQuery({
          query: QUERY_PERSONAL_GOALS,
          variables: { username },
          data: { user }
        });
      }}
    >
      {(setPersonalGoals) => (
        <WrappedComponent {...props} setPersonalGoals={setPersonalGoals} />
      )}
    </Mutation>
  );
}

// class SetPersonalGoalsMutations extends Relay.Mutation {
//   getMutation() {
//     return Relay.QL`
//       mutation { setPersonalGoals }
//     `;
//   }

//   getVariables() {
//     return {
//       userId: this.props.user._id,
//       goals: this.props.goals
//     };
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on SetPersonalGoalsPayload {
//         user {
//           personalGoals
//         }
//       }
//     `;
//   }

//   getConfigs() {
//     return [
//       {
//         type: "FIELDS_CHANGE",
//         fieldIDs: {
//           user: this.props.user.id
//         }
//       }
//     ];
//   }
// }

// export default SetPersonalGoalsMutations;
