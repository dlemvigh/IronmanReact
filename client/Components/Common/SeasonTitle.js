import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import { fromYearWeekId } from "../../../shared/util";

class SeasonTitle extends React.Component {
  renderText() {
    if (this.props.season.from == null && this.props.season.to == null) { return; }

    const from = fromYearWeekId(this.props.season.from).startOf("isoWeek").format("MMMM D");
    const to = fromYearWeekId(this.props.season.to).endOf("isoWeek").format("MMMM D");

    if (this.props.season.to == null) {
      return `(from ${from})`;
    }
    
    if (this.props.season.from == null) {
      return `(to ${to})`;
    }

    return `(${from} - ${to})`;
  }

  renderSpan() {
    return <span className="hidden-xs">{this.renderText()}</span>;
  }

  render() {
    if (this.props.season == null) {
      return <h3>All time</h3>;
    }

    const season = this.props.season;
    return (
      <h3>Medals - {season.name} {this.renderSpan()}</h3>
    );
  }
}

SeasonTitle = createFragmentContainer(SeasonTitle, {
  season: graphql`
    fragment SeasonTitle_season on Season {
      name
      from
      to
    }
  `
});

export default SeasonTitle;

