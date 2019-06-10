import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  ActivityEdgeFragment,
  SummaryFragment,
  updateSummary
} from "./SharedActivityMutation";

const ADD_ACTIVITY = gql`
  mutation AddActivityMutation($input: AddActivityInput!) {
    addActivity(input: $input) {
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
      summary {
        id
        score
        week
        year
        user {
          id
        }
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
  ${SummaryFragment}
`;

export function withAddActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={ADD_ACTIVITY}
      update={(cache, { data: { addActivity } }) => {
        const { activity, summary } = addActivity;
        const { week, year } = activity;
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
        const activities = [...user.activities.edges, addActivity.activityEdge];
        user.activities.edges = activities;

        cache.writeQuery({
          query,
          variables,
          data: { user }
        });

        updateSummary(cache, summary, week, year);
        // const queryUpdateSummary = gql`
        //   query UpdateSummaryQuery($week: Int!, $year: Int!) {
        //     store {
        //       id
        //       summary(week: $week, year: $year) {
        //         id
        //         score
        //         user {
        //           id
        //         }
        //       }
        //     }
        //   }
        // `;
        // let store;
        // try {
        //   store = cache.readQuery({
        //     query: queryUpdateSummary,
        //     variables: {
        //       week,
        //       year
        //     }
        //   }).store;
        // } catch (error) {
        //   store = cache.readQuery({
        //     query: gql`
        //       query UpdateSummaryQuery {
        //         store {
        //           id
        //         }
        //       }
        //     `
        //   }).store;
        // }
        // store.summary = summary;
        // cache.writeQuery({
        //   query: queryUpdateSummary,
        //   variables: { week, year },
        //   data: { store }
        // });
      }}
    >
      {addActivity => <WrappedComponent {...props} addActivity={addActivity} />}
    </Mutation>
  );
}
