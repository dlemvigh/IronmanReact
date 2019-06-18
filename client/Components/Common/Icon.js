import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Icon.modules.scss";

const icons = {
  down: require("../../Media/icons/icons8-chevron-down-100.png"),
  up: require("../../Media/icons/icons8-chevron-up-filled-100.png"),
  edit: require("../../Media/icons/icons8-edit-filled-100.png"),
  delete: require("../../Media/icons/icons8-trash-100.png")
};

let Icon = ({ name }) => (
  <img alt={name} src={icons[name]} styleName="icon" />
);

Icon = CSSModules(Icon, styles);

export default Icon;
