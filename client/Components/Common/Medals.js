import React from "react"
import moment from "moment";

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
    const currentWeek = moment().week();
    console.log(this.props.weeks, this.props.value, this.props.value || this.props.weeks.filter(x => x != currentWeek).length)
    return this.props.value || this.props.weeks.filter(x => x != currentWeek).length;
  }

  render() {
    return (
      this.getValue() < 5 ? this.renderIndividual() : this.renderSummary()
    );
  }
}

export default Medals;
