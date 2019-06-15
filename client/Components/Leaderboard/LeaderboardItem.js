import React from "react";
import gql from "graphql-tag";
import CSSModules from "react-css-modules";
import _ from "lodash";
import { withRouter } from "react-router";

import Pos from "../Common/Pos";
import styles from "./LeaderboardItem.modules.scss";

class LeaderboardItem extends React.Component {
  onClick = () => {
    this.props.history.push(`/${this.props.summary.user.username}`);
  };

  getScore() {
    return _.round(this.props.summary ? this.props.summary.score : 0, 1);
  }

  getProgressWidth = () => {
    return (100 * this.props.summary.score) / this.props.max + "%";
  };

  render() {
    return (
      <tr
        styleName="row"
        onClick={this.onClick}
        data-test={`leaderboard-item-${this.props.summary.user.username}`}
      >
        <td>
          <Pos value={this.props.index + 1} />
        </td>
        <td>{this.props.summary.user.name}</td>
        <td>
          {this.getScore()} points
          <div className="progress" styleName="progress">
            <div
              className="progress-bar"
              styleName="progress-bar"
              style={{ width: this.getProgressWidth() }}
            />
          </div>
        </td>
      </tr>
    );
  }
}

LeaderboardItem = CSSModules(LeaderboardItem, styles);

LeaderboardItem = withRouter(LeaderboardItem);

LeaderboardItem.fragments = {
  summary: gql`
    fragment LeaderboardItem_summary on Summary {
      id
      user {
        id
        name
        username
      }
      score
    }
  `
};

export default LeaderboardItem;
