import React from 'react'

import LeaderboardList from "./LeaderboardList"
import Catchup from "../Catchup/Catchup"

export default class Leaderboard extends React.Component {
    render() {
        return (
            <div>
                <h2>Leaderboard</h2>
                <LeaderboardList />
                <Catchup score={225} target={250} />
            </div>
        );
    }
}