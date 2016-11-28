import React from "react"
import Relay from "react-relay"
import { Table } from "react-bootstrap"
import moment from "moment"
import _ from "lodash";

import CatchupItem from "./CatchupItem"
import CatchupItemTriathlon from "./CatchupItemTriathlon"

// const disciplines = [
//     { id: "1", name: "run", unit: "km", score: 5},
//     { id: "2", name: "bike", unit: "km", score: 1},
//     { id: "3", name: "swim", unit: "km", score: 25},
//     { id: "4", name: "caloric", unit: "cal", score: 0.06},
//     { id: "5", name: "misc", unit: "hours", score: 25}
// ];

class CatchupList extends React.Component {

    getDisciplines() {
        return this.props.store.disciplines;
    }

    getScore(user) {
        return user.summary ? user.summary.score : 0;
    }

    getSortedUser() {
        const sorted = _(this.props.store.users)
            .sortBy(this.getScore)
            .reverse()
            .value();

        return sorted.slice(1);  
    }

    getHighestScore() {
        const max = _.max(this.props.store.users.map(this.getScore))
        return max;
    }

    render() {
        const highscore = this.getHighestScore();
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        {
                            this.getDisciplines().map(x => <th key={x._id}>{x.name}</th>)
                        }
                        <th>tri</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.getSortedUser().map(user => <CatchupItem key={user._id} user={user} summary={user.summary} disciplines={this.props.store.disciplines} highscore={highscore} />)                                                
                    }
                </tbody>
            </Table>
        );
    }
}

CatchupList = Relay.createContainer(CatchupList, {
    initialVariables: {
        week: moment().isoWeek(),
        year: moment().year() 
    },
    fragments: {
        store: () => Relay.QL`
            fragments on Store {
                disciplines {
                    _id
                    name
                    ${CatchupItem.getFragment('disciplines')}
                }
                users {
                    _id
                    ${CatchupItem.getFragment('user')}
                    summary(week: $week, year: $year) {
                        score
                        ${CatchupItem.getFragment('summary')}
                    }
                }
            }
        `
    }
})

export default CatchupList