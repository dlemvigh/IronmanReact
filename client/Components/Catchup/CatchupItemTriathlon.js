import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const swim = { score: 25, dist: .4 };
const bike = { score: 1, dist: 18 };
const run = { score: 5, dist: 4 };
const total = swim.score * swim.dist + bike.score * bike.dist + run.score * run.dist;

class CatchupItemTriathlon extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired
  }

  getDiff() {
    return this.props.highscore - this.props.score;
  }

  getDistance() {
    if (this.getDiff() < 12) {
      return "-";
    }
    return `${this.getPart(swim, 1)} - ${this.getPart(bike, 0)} - ${this.getPart(run, 1)} km`;
  }

  getPart(disc, decimals) {
    const dist = _.round(disc.dist * this.getDiff() / total, decimals);
    return dist;
  }

  render() {
    return (
      <td className="hidden-xs">{this.getDistance()}</td>
    );
  }
}

export default CatchupItemTriathlon;