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
            distance: this.props.distance
        }
    }

    getFatQuery() {
        return Relay.QL`
            fragment on AddActivityPayload {
                activityEdge,
                user {
                    activityConnection
                }
            }
        `
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentName: 'user',
            parentID: this.props.user.id,
            edgeName: 'activityEdge',
            rangeBehaviors: {
                '': 'append',
                'orderby(newest)': 'prepend'
            }
        }]
    }
}

export default AddActivityMutation;