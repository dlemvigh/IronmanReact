import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ActivityEdgeFragment, GET_ACTIVITIES } from "./SharedActivityMutation";

const ADD_ACTIVITY = gql`
  mutation AddActivityMutation($input: AddActivityInput!) {
    addActivity(input: $input) {
      medals {
        id
        gold
        goldWeeks
        silver
        silverWeeks
        bronze
        bronzeWeeks
      }
      activityEdge {
        ...ActivityEdgeFragment
        node {
          id          
        }
      }
    }
  }
  ${ActivityEdgeFragment}
`;

export function withAddActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={ADD_ACTIVITY}
      update={(cache, { data: { addActivity }}) => {
        const query = gql`
          query AddActivityQuery($username: String!) {
            user(username: $username) {
              id
              activities {
                edges {
                  ...ActivityEdgeFragment
                  node {
                    id
                  }
                }
              }
            }
          }
          ${ActivityEdgeFragment}
        `;

        const variables = {
          username: props.user.username
        };

        const { user } = cache.readQuery({ query, variables });
        const activities = [
          ...user.activities.edges,
          addActivity.activityEdge
        ];
        user.activities.edges = activities;

        cache.writeQuery({
          query,
          variables,
          data: { user }
        });
      }}
    >
      {(addActivity) => (
        <WrappedComponent {...props} addActivity={addActivity} />
      )}
    </Mutation>
  );
}