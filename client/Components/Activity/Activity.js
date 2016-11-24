import React from 'react'
import Relay from 'react-relay'

import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'


class Activity extends React.Component {

    state = {
        editing: null
    }

    onBeginEdit = (activity) => {
        this.setState({editing: activity});
    }

    onEndEdit = () => {
        this.setState({editing: null})
    }

    render() {
        return (
            <div>
                <h1>{this.props.user.name}</h1>                
                <ActivityForm {...this.props} show={this.state.editing === null} activity={null} />
                <ActivityForm {...this.props} show={this.state.editing !== null} activity={this.state.editing} onEditDone={this.onEndEdit} />
                <h3>Activities</h3>
                <ActivityList {...this.props} onEdit={this.onBeginEdit} />
            </div>
        )
    }
}

Activity = Relay.createContainer(Activity, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                ${ActivityForm.getFragment('store')}
                ${ActivityList.getFragment('store')}
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