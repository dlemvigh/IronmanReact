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
                        this.props.user.activityConnection.edges.map(edge => 
                            <ActivityItem key={edge.node.id} activity={edge.node} />)
                    }
                </tbody>
            </Table>
        );
    }
}

// ActivityList = Relay.createContainer(ActivityList, {
//     fragments: {
//         user: () => Relay.QL`
//             fragment on User {
//                 activityConnection(first: 100) {
//                     edges {
//                         node {
//                             id
//                             ${ActivityItem.getFragment('activity')}
//                         }
//                     }
//                 }
//             }
//         `
//     }
// })

export default ActivityList