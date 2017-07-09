import React from "react";
import Relay from "react-relay";
import moment from "moment";
import { fromYearWeekId } from "../../../shared/util";

class Season extends React.Component {
    render() {
        if (this.props.season == null) {
            return <h3>All time</h3>
        }

        const season = this.props.season;
        const from = fromYearWeekId(this.props.season.from).startOf("isoWeek");
        const to = fromYearWeekId(this.props.season.to).endOf("isoWeek");
        return (
            <h3>Medals - {season.name} ({from.format("MMMM D")} - {to.format("MMMM D")})</h3>
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

