import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ActivityEdgeFragment, GET_ACTIVITIES } from "./SharedActivityMutation";

const ADD_ACTIVITY = gql`
mutation AddActivityMutation($input: AddActivityInput!) {
  addActivity(input: $input) {
    activityEdge {
      ...ActivityEdgeFragment
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
        const activity = addActivity.activityEdge.node;
        const { user } = cache.readQuery({ query: GET_ACTIVITIES, variables: { username: "david" } });
        user.activities.edges = [
          ...user.activities.edges,
          { 
            node: activity,
            __typename: "Activity"
          }
        ];
        cache.writeQuery({
          query: GET_ACTIVITIES,
          variables: { username: "david" },
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