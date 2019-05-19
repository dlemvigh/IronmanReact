import React from "react";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import CSSModules from "react-css-modules";
import _ from "lodash";

import { mapFilter, getClassName } from "./CatchupFilter";
import CatchupItemTriathlon from "./CatchupItemTriathlon";

import styles from "./CatchupItem.scss";

class CatchupItem extends React.Component {
  onClick = () => {
    this.props.router.push(`/${this.props.user.username}`);
  };

  getScore() {
    return this.props.summary ? this.props.summary.score : 0;
  }

  getDisciplines() {
    const filtered = mapFilter(this.props.disciplines);
    return filtered;
  }

  getCatchupDistance(disc) {
    const dist = _.round(
      (this.props.highscore - this.getScore()) / disc.score,
      1
    );
    return `${dist} ${disc.unit}`;
  }

  render() {
    return (
      <tr onClick={this.onClick} styleName="row">
        <td>{this.props.user.name}</td>
        {this.getDisciplines().map(disc => {
          return (
            <td key={disc._id} className={getClassName(disc.name)}>
              {this.getCatchupDistance(disc)}
            </td>
          );
        })}
        <CatchupItemTriathlon
          score={this.getScore()}
          highscore={this.props.highscore}
        />
      </tr>
    );
  }
}

CatchupItem = CSSModules(CatchupItem, styles);

CatchupItem = withRouter(CatchupItem);

CatchupItem.fragments = {
  user: gql`
    fragment CatchupItem_user on User {
      name
      username
    }
  `,
  disciplines: gql`
    fragment CatchupItem_disciplines on Discipline {
      _id
      name
      score
      unit
    }
  `,
  summary: gql`
    fragment CatchupItem_summary on Summary {
      score
    }
  `
};

export default CatchupItem;
