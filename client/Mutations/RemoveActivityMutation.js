import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { GET_ACTIVITIES } from "./SharedActivityMutation";

const REMOVE_ACTIVITY = gql`
  mutation RemoveActivityMutation($input: RemoveActivityInput!) {
    removeActivity(input: $input) {
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
`;

export function withRemoveActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={REMOVE_ACTIVITY}
      update={(cache, { data: { removeActivity }}) => {
        const username = props.user.username;
        const { removedActivityId } = removeActivity;
        
        const { user } = cache.readQuery({ 
          query: GET_ACTIVITIES, 
          variables: { username } 
        });
        const activities = user.activities.edges.filter(edge => edge.node.id !== removedActivityId);
        user.activities.edges = activities;
        cache.writeQuery({
          query: GET_ACTIVITIES,
          variables: { username },
          data: { user }
        });
      }}
    >
      {(removeActivity) => (
        <WrappedComponent {...props} removeActivity={removeActivity} />
      )}
    </Mutation>
  );
}
