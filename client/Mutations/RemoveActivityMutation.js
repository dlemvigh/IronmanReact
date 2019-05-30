import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { GET_ACTIVITIES } from "./SharedActivityMutation";

const REMOVE_ACTIVITY = gql`
  mutation RemoveActivityMutation($input: RemoveActivityInput!) {
    removeActivity(input: $input) {
      removedActivityId    
    }
  }
`;

export function withRemoveActivityMutation(WrappedComponent) {
  return ({ ...props }) => (
    <Mutation
      mutation={REMOVE_ACTIVITY}
      update={(cache, { data: { removeActivity }}) => {
        debugger;
        const { removedActivityId } = removeActivity;
        
        const { user } = cache.readQuery({ 
          query: GET_ACTIVITIES, 
          variables: { username: "david" } 
        });
        const activities = user.activities.edges.filter(edge => edge.node.id !== removedActivityId);
        user.activities.edges = activities;
        cache.writeQuery({
          query: GET_ACTIVITIES,
          variables: { username: "david" },
          data: { user }
        });
      }}
    >
      {(removeActivity) => (
        <WrappedComponent {...props} removeActivity={removeActivity} />
      )}
    </Mutation>
  )
}

// class RemoveActivityMutation extends Relay.Mutation {
//   getMutation() {
//     return Relay.QL`
//       mutation { removeActivity }
//     `;
//   }

//   getVariables() {
//     return {
//       id: this.props.id
//     };
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on RemoveActivityPayload {
//         removedActivityId
//         medals
//         user { 
//           activities
//           summary {
//             score
//           } 
//         }
//         store
//       }
//     `;
//   }

//   getConfigs() {
//     return [
//       {
//         type: "NODE_DELETE",
//         parentName: "user",
//         parentID: this.props.nodeId,
//         connectionName: "activities",
//         deletedIDFieldName: "removedActivityId"
//       },
//       {
//         type: "FIELDS_CHANGE",
//         fieldIDs: {
//           medals: this.props.medals,
//           store: this.props.store
//         }
//       }
//     ];
//   }
// }

// export default RemoveActivityMutation;
