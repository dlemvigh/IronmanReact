import React from 'react'
import Relay from 'react-relay'

import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'

class Activity extends React.Component {

    render() {
        return (
            <div>
                <ActivityForm />
                <h3>Activities</h3>
                <ActivityList user={this.props.user} />
            </div>
        )
    }
}

Activity = Relay.createContainer(Activity, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                ${ActivityList.getFragment('user')}
            }
        `
    }
})

export default Activity