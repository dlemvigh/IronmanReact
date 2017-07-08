import React from "react"
import moment from "moment";

import { getYearWeekId } from "../../../shared/util";

class Medals extends React.Component {

  getMedal = () => {
    switch (this.props.type) {
      case "gold": return "🥇";
      case "silver": return "🥈";
      case "bronze": return "🥉";
      default: "";
    }
  }

  renderIndividual() {
    let list = Array.apply(null, Array(this.getValue() || 0));
    return <span>{ list.map(() => this.getMedal())}</span>
  }

  renderSummary() {
    return <span>{this.getMedal()} x{this.getValue()}</span>;
  }

  getValue() {
    const currentWeek = getYearWeekId(moment().year(), moment().isoWeek());
    return this.props.value || this.props.weeks.filter(x => x < currentWeek).length;
  }

  render() {
    return (
      this.getValue() < 5 ? this.renderIndividual() : this.renderSummary()
    );
  }
}

export default Medals;
