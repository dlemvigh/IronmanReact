import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  ActivityFragment,
  SummaryFragment,
  updateSummary
} from "./SharedActivityMutation";

const UPDATE_ACTIVITY = gql`
  mutation UpdateActivityMuataion($input: EditActivityInput!) {
    editActivity(input: $input) {
      summary {
        ...SummaryFragment
      }
      summaryPrev {
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
      activity {
        ...ActivityFragment
      }
      activityPrev {
        week
        year
      }
    }
  }
  ${ActivityFragment}
  ${SummaryFragment}
`;

export function withEditActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={UPDATE_ACTIVITY}
      update={(cache, { data: { editActivity } }) => {
        const { activity, activityPrev, summary, summaryPrev } = editActivity;
        cache.writeData({
          id: `Activity:${activity.id}`,
          data: activity
        });
        updateSummary(cache, summaryPrev, activityPrev.week, activityPrev.year);
        updateSummary(cache, summary, activity.week, activity.year);
      }}
    >
      {editActivity => (
        <WrappedComponent {...props} editActivity={editActivity} />
      )}
    </Mutation>
  );
}
