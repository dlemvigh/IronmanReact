import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  GET_ACTIVITIES,
  SummaryFragment,
  updateSummary
} from "./SharedActivityMutation";

const REMOVE_ACTIVITY = gql`
  mutation RemoveActivityMutation($input: RemoveActivityInput!) {
    removeActivity(input: $input) {
      activity {
        week
        year
      }
      summary {
        ...SummaryFragment
      }
      medals {
        id
        gold
        goldWeeks
        silver
        silverWeeks
        bronze
        bronzeWeeks
      }
      removedActivityId
    }
  }
  ${SummaryFragment}
`;

export function withRemoveActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={REMOVE_ACTIVITY}
      update={(cache, { data: { removeActivity } }) => {
        const username = props.user.username;
        const { removedActivityId, activity, summary } = removeActivity;
        const { week, year } = activity;

        const { user } = cache.readQuery({
          query: GET_ACTIVITIES,
          variables: { username }
        });
        const activities = user.activities.edges.filter(
          edge => edge.node.id !== removedActivityId
        );
        user.activities.edges = activities;
        cache.writeQuery({
          query: GET_ACTIVITIES,
          variables: { username },
          data: { user }
        });

        updateSummary(cache, summary, week, year);
      }}
    >
      {removeActivity => (
        <WrappedComponent {...props} removeActivity={removeActivity} />
      )}
    </Mutation>
  );
}
