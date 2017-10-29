import Relay from 'react-relay/classic';

class EditActivityMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { editActivity }
    `;
  }

  getVariables() {
    return {
      id: this.props._id,
      disciplineId: this.props.disciplineId,
      userId: this.props.userId,
      distance: this.props.distance,
      date: this.props.date
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EditActivityPayload {
        activity
        medals
        user { 
          summary {
            score
          }
        }
        store
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        activity: this.props.id,
        medals: this.props.medals,
        store: this.props.store
      },
    }];
  }
}

export default EditActivityMutation;