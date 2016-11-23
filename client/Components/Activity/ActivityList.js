import React from 'react'
import Relay from 'react-relay'
import { Table } from "react-bootstrap"

import ActivityHeader from './ActivityHeader'
import ActivityItem from './ActivityItem'

class ActivityList extends React.Component {

    render() {
        return (
            <Table>
                <thead>
                    <ActivityHeader />
                </thead>
                <tbody>
                    {
                        this.props.user.activities.edges.map(edge => 
                            <ActivityItem key={edge.node.id} activity={edge.node} user={this.props.user} onEdit={this.props.onEdit} />)
                    }
                </tbody>
            </Table>
        );
    }
}

ActivityList = Relay.createContainer(ActivityList, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                ${ActivityItem.getFragment('user')}
                activities(first: 100) {
                    edges {
                        node {
                            id
                            ${ActivityItem.getFragment('activity')}
                        }
                    }
                }
            }
        `
    }
})

export default ActivityList