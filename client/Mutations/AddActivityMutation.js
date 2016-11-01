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
                store { activities }
            }
        `
    }

    getConfigs() {
        debugger
        return [{
            type: 'RANGE_ADD',
            parentName: 'store',
            parentID: this.props.storeId,
            connectionName: 'activities',
            edgeName: 'activityEdge',
            rangeBehaviors: {
                '': 'append',
            }
        }]
    }
}

export default AddActivityMutation;