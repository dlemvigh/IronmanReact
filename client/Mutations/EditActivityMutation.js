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
        debugger;
        const { activity } = editActivity;
        cache.writeData({
          id: `Activity:${activity.id}`,
          data: activity
        })
      }}
    >
      {(editActivity) => (
        <WrappedComponent {...props} editActivity={editActivity} />
      )}
    </Mutation>
  )
}

// class EditActivityMutation extends Relay.Mutation {
//   getMutation() {
//     return Relay.QL`
//       mutation { editActivity }
//     `;
//   }

//   getVariables() {
//     return {
//       id: this.props._id,
//       disciplineId: this.props.disciplineId,
//       userId: this.props.userId,
//       distance: this.props.distance,
//       date: this.props.date
//     };
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on EditActivityPayload {
//         activity
//         medals
//         user { 
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
//         type: "FIELDS_CHANGE",
//         fieldIDs: {
//           activity: this.props.id,
//           medals: this.props.medals,
//           store: this.props.store
//         }
//       }
//     ];
//   }
// }

// export default EditActivityMutation;
