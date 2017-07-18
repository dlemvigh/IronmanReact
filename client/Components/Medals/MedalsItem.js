import React from "react";
import Relay from "react-relay";
import CSSModules from "react-css-modules";

import styles from "./MedalsItem.scss";
import Medals from "../Common/Medals";

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
        <td styleName="">{this.props.user.medals && <Medals season={this.props.season} weeks={this.props.user.medals.goldWeeks} type="gold" />}</td> 
        <td styleName="">{this.props.user.medals && <Medals season={this.props.season} weeks={this.props.user.medals.silverWeeks} type="silver" />}</td> 
        <td styleName="">{this.props.user.medals && <Medals season={this.props.season} weeks={this.props.user.medals.bronzeWeeks} type="bronze" />}</td> 
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
          goldWeeks 
          silverWeeks 
          bronzeWeeks 
        } 
      }
    `
  }
});

export default MedalsItem;