import Relay from "react-relay"

class RemoveActivityMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`
            mutation { removeActivity }
        `
    }

    getVariables() {
        return {
            id: this.props.id
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on RemoveActivityPayload {
                removedActivityId
                medals
                user { 
                    activities
                    summary {
                        score
                    } 
                }
            }
        `
    }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.nodeId,
      connectionName: 'activities',
      deletedIDFieldName: 'removedActivityId',
    },{
        type: 'FIELDS_CHANGE',
        fieldIDs: {
            medals: this.props.medals
        }
    }];
  }
}

export default RemoveActivityMutation;