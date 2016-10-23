import React from "react"
import { Table } from "react-bootstrap"

import CatchupItem from "./CatchupItem"
import CatchupItemTriathlon from "./CatchupItemTriathlon"

const disciplines = [
    { id: "1", name: "run", unit: "km", score: 5},
    { id: "2", name: "bike", unit: "km", score: 1},
    { id: "3", name: "swim", unit: "km", score: 25},
    { id: "4", name: "caloric", unit: "cal", score: 0.06},
    { id: "5", name: "misc", unit: "hours", score: 25}
];

export default class CatchupList extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    { disciplines.map(item =>
                        <CatchupItem key={item.id} discipline={item} score={this.props.score} />
                    ) }
                    <CatchupItemTriathlon score={this.props.score} />
                </tbody>
            </Table>
        );
    }
}