import React from "react"

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
    let list = Array.apply(null, Array(this.props.value || 0));
    return <span>{ list.map(() => this.getMedal())}</span>
  }

  renderSummary() {
    return <span>{this.getMedal()} x{this.props.value}</span>;
  }

  render() {
    return (
      this.props.value < 5 ? this.renderIndividual() : this.renderSummary()
    );
  }
}

export default Medals;
