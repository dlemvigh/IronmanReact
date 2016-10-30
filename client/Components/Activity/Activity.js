import React from 'react'
import Relay from 'react-relay'

import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'

class Activity extends React.Component {

    render() {
        return (
            <div>
                <ActivityForm {...this.props} />
                <h3>Activities</h3>
                <ActivityList {...this.props} />
            </div>
        )
    }
}

Activity = Relay.createContainer(Activity, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                ${ActivityForm.getFragment('user')}
                ${ActivityList.getFragment('user')}
            }
        `,
        // disciplines: () => Relay.QL`
        //     fragment on Discipline {
        //         ${ActivityForm.getFragment('disciplines')}
        //     }
        // `
    }
})

export default Activity