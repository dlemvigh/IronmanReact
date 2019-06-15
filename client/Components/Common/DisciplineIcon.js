import React from "react";
import CSSModules from "react-css-modules";

import styles from "./DisciplineIcon.modules.scss";
import iconRun from "../../Media/icons/icons8-Running Filled-100.png";
import iconBike from "../../Media/icons/icons8-Cycling Filled-100.png";
import iconSwim from "../../Media/icons/icons8-Swimming Filled-100.png";
import iconCal from "../../Media/icons/icons8-Heart with Pulse Filled-100.png";
import iconMisc from "../../Media/icons/icons8-Timer Filled-100.png";

const getIcon = disciplineName => {
  switch (disciplineName) {
    case "run":
      return iconRun;
    case "bike":
      return iconBike;
    case "swim":
      return iconSwim;
    case "caloric":
      return iconCal;
    case "misc":
      return iconMisc;
    default:
      return iconMisc;
  }
};

const getStyle = (size, disabled) => {
  let style = `icon-${size}`;
  if (disabled) {
    style += " icon-disabled";
  }
  return style;
};

let DisciplineIcon = ({ value, size = "small", disabled = false, ...props }) => (
  <img src={getIcon(value)} styleName={getStyle(size, disabled)} {...props} />
);

DisciplineIcon = CSSModules(DisciplineIcon, styles, { allowMultiple: true });

export default DisciplineIcon;
