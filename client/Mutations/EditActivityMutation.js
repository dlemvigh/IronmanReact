import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ActivityFragment } from "./SharedActivityMutation";

const UPDATE_ACTIVITY = gql`
  mutation UpdateActivityMuataion($input: EditActivityInput!) {
    editActivity(input: $input) {
      activity {
        ...ActivityFragment
      }
    }
  }
  ${ActivityFragment}
`;

export function withEditActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={UPDATE_ACTIVITY}
      update={(cache, { data: { editActivity } }) => {
        const { activity } = editActivity;
        cache.writeData({
          id: `Activity:${activity.id}`,
          data: activity
        });
      }}
    >
      {(editActivity) => (
        <WrappedComponent {...props} editActivity={editActivity} />
      )}
    </Mutation>
  );
}
