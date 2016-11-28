import React from 'react'
import Relay from 'react-relay'
import Moment from 'moment'

import LeaderboardList from "./LeaderboardList"
import Catchup from "../Catchup/Catchup"
import Medals from "../Medals/Medals"

class Leaderboard extends React.Component {
    render() {
        return (
            <div>
                <h2>Leaderboard</h2>                
                <h3>This week</h3>
                <LeaderboardList summary={this.props.store.current} />
                {this.props.store.last.length > 0 && <h3>Last week</h3>}
                {this.props.store.last.length > 0 && <LeaderboardList summary={this.props.store.last} />}
                <Medals store={this.props.store} />
            </div>
        );
    }
}

Leaderboard = Relay.createContainer(Leaderboard, {
    initialVariables: {
        currentWeekNo: Moment().isoWeek(),
        currentWeekYear: Moment().year(),
        lastWeekNo: Moment().add(-7, 'days').isoWeek(),
        lastWeekYear: Moment().add(-7, 'days').year()
    },
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id
                ${Medals.getFragment('store')}
                current: summary(week: $currentWeekNo, year: $currentWeekYear) {
                    ${LeaderboardList.getFragment('summary')}
                }
                last: summary(week: $lastWeekNo, year: $lastWeekYear) {
                    ${LeaderboardList.getFragment('summary')}
                }
                total: summary {
                    ${LeaderboardList.getFragment('summary')}
                }
            }
        `
    }
})

export default Leaderboard;