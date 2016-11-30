import React from "react";
import Relay from "react-relay";
import CSSModules from "react-css-modules";

import styles from "./MedalsItem.scss";

class MedalsItem extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onClick = () => {
    this.context.router.push(`/${this.props.user.username}`);
  }

  getStyleName() {
    switch(this.props.pos) {
      case 1: return "gold";
      case 2: return "silver";
      case 3: return "bronze";
      default: "";
    }
  }

  render() {
    return (
      <tr onClick={this.onClick} styleName="row">
        <td>{this.props.user.name}</td>
        <td styleName="gold">{this.props.user.medals && this.props.user.medals.gold}</td>
        <td styleName="silver">{this.props.user.medals && this.props.user.medals.silver}</td>
        <td styleName="bronze">{this.props.user.medals && this.props.user.medals.bronze}</td>
      </tr>
    );
  }
}

MedalsItem = CSSModules(MedalsItem, styles);

MedalsItem = Relay.createContainer(MedalsItem, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        username
        name
        medals {
          gold
          silver
          bronze
        }
      }
    `
  }
});

export default MedalsItem;