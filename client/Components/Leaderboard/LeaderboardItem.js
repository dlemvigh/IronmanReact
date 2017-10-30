import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import _ from "lodash";

import Pos from "../Common/Pos";
import styles from "./LeaderboardItem.scss";

class LeaderboardItem extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onClick = () => {
    this.context.router.push(`/${this.props.summary.user.username}`);
  }

  getScore() {
    return _.round(this.props.summary ? this.props.summary.score : 0, 1);
  }

  getProgressWidth = () => {
    return (100 * this.props.summary.score / this.props.max) + "%";
  }

  render() {
    return (
      <tr styleName="row" onClick={this.onClick}>
        <td><Pos value={this.props.index + 1} /></td>
        <td>{this.props.summary.user.name}</td>
        <td>
          {this.getScore()} points
          <div className="progress" styleName="progress">
            <div className="progress-bar" styleName="progress-bar" style={{width: this.getProgressWidth()}} />
          </div>
        </td>
      </tr>
    );
  }
}

LeaderboardItem = CSSModules(LeaderboardItem, styles);

LeaderboardItem = createFragmentContainer(LeaderboardItem, {
  summary: graphql`
    fragment LeaderboardItem_summary on Summary {
      user {
        name
        username
      }
      score
    }
  `
});

export default LeaderboardItem;