import React from "react"
import { Table } from "react-bootstrap"

import LeaderboardItem from "./LeaderboardItem"

const data = [
    {pos: 1, name: "Alice", points: 250},
    {pos: 2, name: "Charlie", points: 225},
    {pos: 3, name: "Eve", points: 212},
    {pos: 4, name: "Bob", points: 179},
    {pos: 5, name: "Oscar", points: 37},
]

export default class LeaderboardList extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) =>
                        <LeaderboardItem key={index} pos={item.pos} name={item.name} points={item.points} />
                    )}
                </tbody>
            </Table>
        );
    }
}