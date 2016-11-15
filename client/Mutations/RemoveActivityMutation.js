import Relay from "react-relay"

class AddActivityMutation extends Relay.Mutation {

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
                user { 
                    activities
                    summary {
                        score
                    } 
                    medals {
                        gold
                        silver
                        bronze
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
    // },{
    //   type: 'RANGE_DELETE',
    //   parentName: 'user',
    //   parentID: this.props.nodeId,
    //   connectionName: 'activities',
    //   deletedIDFieldName: 'removedActivityId',
    //   pathToConnection: ['user', 'activities', 'edges', 'node']        
    }];
  }
}

export default AddActivityMutation;