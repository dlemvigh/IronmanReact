import React from "react";
import CSSModules from "react-css-modules";

import styles from "./ActivityHeader.modules.scss";

class ActivityHeader extends React.Component {
  render() {
    const hiddenXs = "d-none d-md-table-cell";
    return (
      <tr>
        <th>Discipline</th>
        <th>Distance</th>
        <th>Score</th>
        <th>Date</th>
        <th className={hiddenXs}>Day</th>
        <th className={hiddenXs}>Week</th>
        <th className={hiddenXs}>Year</th>
        <th colSpan={2} />
      </tr>
    );
  }
}

export default CSSModules(ActivityHeader, styles);