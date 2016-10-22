import React from "react"
import CSSModules from "react-css-modules"

import styles from "./ActivityHeader.scss"

class ActivityHeader extends React.Component {
    render() {
        return (
            <tr>
                <th styleName="bordered">Discipline</th>
                <th styleName="bordered">Distance</th>
                <th styleName="bordered">Score</th>
                <th styleName="bordered">Date</th>
            </tr>
        );
    }
}

export default CSSModules(ActivityHeader, styles);