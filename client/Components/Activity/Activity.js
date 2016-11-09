import React from 'react'
import Relay from 'react-relay'

import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'


class Activity extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.user.name}</h1>
                <ActivityForm {...this.props} />
                <h3>Activities</h3>
                <ActivityList {...this.props} />
            </div>
        )
    }
}

Activity = Relay.createContainer(Activity, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                ${ActivityForm.getFragment('store')}
            }`,
        user: () => Relay.QL`
            fragment on User {
                name
                ${ActivityForm.getFragment('user')}
                ${ActivityList.getFragment('user')}
            }
        `
    }
})

export default Activity