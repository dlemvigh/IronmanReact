import Relay from "react-relay"

class EditActivityMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`
            mutation { editActivity }
        `
    }

    getVariables() {
        return {
            id: this.props._id,
            disciplineId: this.props.disciplineId,
            userId: this.props.userId,
            distance: this.props.distance,
            date: this.props.date
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on EditActivityPayload {
                activity
                user { 
                    summary {
                        score
                    }
                }
            }
        `
    }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        activity: this.props.id,
      },
    }];
  }
}

export default EditActivityMutation;