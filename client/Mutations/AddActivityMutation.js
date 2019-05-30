import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ActivityEdgeFragment = gql`
  fragment ActivityEdgeFragment on ActivityEdge {
    node {
      _id
      id
      date
      disciplineId
      disciplineName
      distance        
      score
      unit
      week
    }
  }
`;

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

const GET_ACTIVITIES = gql`
  query GetActivities($username: String!) {
    user(username: $username) {
      id
      activities(first: 100) {
        edges {
          ...ActivityEdgeFragment
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