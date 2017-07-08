import React from "react";
import Relay from "react-relay";

class Season extends React.Component {
    render() {
        const season = this.props.season;
        return (
            <h3>{season.name} ({season.from % 100} - {season.to % 100})</h3>
        );
    }
}

Season = Relay.createContainer(Season, {
    fragments: {
        season: () => Relay.QL`
            fragment on Season {
                name
                from
                to
            }
        `
    }
});

export default Season;

