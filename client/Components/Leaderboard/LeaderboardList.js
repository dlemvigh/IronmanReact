import React from "react";
import gql from "graphql-tag";
import { Table } from "react-bootstrap";
import _ from "lodash";

import LeaderboardItem from "./LeaderboardItem";

class LeaderboardList extends React.Component {
  sorted() {
    const sorted = _(this.props.summary)
      .sortBy([summary => summary.score || 0])
      .reverse()
      .value();
    return sorted;
  }

  render() {
    const sorted = this.sorted();
    const max = sorted.length > 0 ? sorted[0].score : 0;
    return (
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th className="col-xs-3">Position</th>
            <th className="col-xs-4">Name</th>
            <th className="col-xs-5">Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((summary, index) => (
            <LeaderboardItem
              key={summary._id}
              summary={summary}
              index={index}
              max={max}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

LeaderboardList.fragments = {
  summary: gql`
    fragment LeaderboardList_summary on Summary {
      _id
      score
      ...LeaderboardItem_summary
    }
    ${LeaderboardItem.fragments.summary}
  `
};

export default LeaderboardList;
