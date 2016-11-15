import Relay from "react-relay"

class AddActivityMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`
            mutation { addActivity }
        `
    }

    getVariables() {
        return {
            disciplineId: this.props.disciplineId,
            userId: this.props.userId,
            distance: this.props.distance,
            date: this.props.date
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on AddActivityPayload {
                activityEdge,
                user { 
                    activities
                    summary {
                        score
                    }
                }
                users(first: 100) {
                    edges {
                        node {
                            medals {
                                gold
                                silver
                                bronze
                            }
                        }
                    }
                }
            }
        `
    }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.nodeId,
      connectionName: 'activities',
      edgeName: 'activityEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    },{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
          users: this.props.userIds
      } 
    }];
  }
}

export default AddActivityMutation;