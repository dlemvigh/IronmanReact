import React from "react"

import CatchupList from "../Catchup/CatchupList"

export default class Catchup extends React.Component {
    static propTypes = {
        score: React.PropTypes.number.isRequired,
        target: React.PropTypes.number.isRequired
    }

    getScore() {
        return this.props.target - this.props.score;
    }

    render() {
        if (this.props.score >= this.props.target) return null;

        return (
            <div>
                <h3>Catchup</h3>
                <CatchupList score={this.getScore()} />
            </div>
        )
    }
}