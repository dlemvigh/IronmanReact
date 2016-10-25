import React from 'react'
import { Table } from "react-bootstrap"

import ActivityHeader from './ActivityHeader'
import ActivityItem from './ActivityItem'

export default class ActivityList extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <ActivityHeader />
                </thead>
                <tbody>
                    {
                        this.props.activities.map((item, index) => 
                            <ActivityItem key={index} {...item} />)
                    }
                </tbody>
            </Table>
        );
    }
}