import React from "react";
import styles from "./Discipline.scss";
import CSSModules from "react-css-modules";

import iconRun from "../../Media/icons/icons8-Running Filled-100.png";
import iconBike from "../../Media/icons/icons8-Cycling Filled-100.png";
import iconSwim from "../../Media/icons/icons8-Swimming Filled-100.png";
import iconCal from "../../Media/icons/icons8-Heart with Pulse Filled-100.png";
import iconMisc from "../../Media/icons/icons8-Timer Filled-100.png";

class Discipline extends React.Component {

  getIcon(disciplineName) {
    switch(disciplineName) {
      case "run": return iconRun;
      case "bike": return iconBike;
      case "swim": return iconSwim;
      case "caloric": return iconCal;
      case "misc": return iconMisc;
      default: return iconMisc;        
    }
  }
  getName(disciplineName) {
    return disciplineName[0].toUpperCase() + disciplineName.substr(1);
  }
  render() {
    const disciplineName = this.props.value || "test";
    return (
      <span>
        <img src={this.getIcon(disciplineName)} styleName="icon" />
        {this.getName(disciplineName)}
      </span>
    );
  }
}

Discipline = CSSModules(Discipline, styles);

export default Discipline;