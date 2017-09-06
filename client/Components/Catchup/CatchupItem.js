import React from "react";
import Relay from "react-relay";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import _ from "lodash";

import { mapFilter, getClassName } from "./CatchupFilter"; 
import CatchupItemTriathlon from "./CatchupItemTriathlon";

import styles from "./CatchupItem.scss";

class CatchupItem extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onClick = () => {
    this.context.router.push(`/${this.props.user.username}`);
  }

  getScore() {
    return this.props.summary ? this.props.summary.score : 0;
  }

  getDisciplines(){
    const filtered = mapFilter(this.props.disciplines);
    return filtered;
  }

  getCatchupDistance(disc) {
    const dist = _.round((this.props.highscore - this.getScore()) / disc.score, 1);
    return `${dist} ${disc.unit}`;
  }

  render() {
    return (
      <tr onClick={this.onClick} styleName="row">
        <td>{this.props.user.name}</td>
        {
          this.getDisciplines().map(disc => {
            return <td key={disc._id} className={getClassName(disc.name)}>{this.getCatchupDistance(disc)}</td>;
          })
        }
        <CatchupItemTriathlon score={this.getScore()} highscore={this.props.highscore} />
      </tr>
    );
  }
}

CatchupItem = CSSModules(CatchupItem, styles);

CatchupItem = Relay.createContainer(CatchupItem, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
        username
      }
    `,
    disciplines: () => Relay.QL`
      fragment on Discipline @relay(plural: true) {
        _id
        name
        score
        unit
      }
    `,
    summary: () => Relay.QL`
      fragment on Summary {
        score
      }
    `
  }
});

export default CatchupItem;