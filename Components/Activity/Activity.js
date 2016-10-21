import React from 'react'

import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.commitActivity = this.commitActivity.bind(this);
    }

    state = {
        data: [
            {
                discipline: "run",
                distance: 5,
                unit: "km",
                score: 25,
                date: new Date()
            },{
                discipline: "swim",
                distance: 1.2,
                unit: "km",
                score: 30,
                date: new Date()
            }
        ]
    };
    

    commitActivity(activity) {
        this.setState({
            data: this.state.data.concat([activity])
        });
    }

    render() {
        return (
            <div>
                <ActivityForm commitActivity={this.commitActivity} />
                <h3>Activities</h3>
                <ActivityList activities={this.state.data} />
            </div>
        )
    }
}