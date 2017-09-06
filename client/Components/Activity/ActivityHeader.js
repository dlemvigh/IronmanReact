import React from "react";
import CSSModules from "react-css-modules";

import styles from "./ActivityHeader.scss";

class ActivityHeader extends React.Component {
  render() {
    return (
      <tr>
        <th>Discipline</th>
        <th>Distance</th>
        <th>Score</th>
        <th>Date</th>
        <th className="hidden-xs">Day</th>
        <th className="hidden-xs">Week</th>
        <th className="hidden-xs">Year</th>
        <th colSpan={2} />
      </tr>
    );
  }
}

export default CSSModules(ActivityHeader, styles);