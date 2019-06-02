import React from "react";

import { filterMedals } from "../../../shared/lib/util";

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
    return <span>{ list.map(() => this.getMedal())}</span>;
  }

  renderSummary() {
    return <span>{this.getMedal()} x{this.getValue()}</span>;
  }

  getValue() {
    return this.props.value || filterMedals(this.props.weeks, this.props.season).length;
  }

  render() {
    return (
      this.getValue() < 5 ? this.renderIndividual() : this.renderSummary()
    );
  }
}

export default Medals;
