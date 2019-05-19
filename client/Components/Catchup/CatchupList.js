import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import titleCase from "title-case";

import { mapFilter, getClassName } from "./CatchupFilter";
import CatchupItem from "./CatchupItem";
import gql from "graphql-tag";

class CatchupList extends React.Component {
  getDisciplines() {
    const filtered = mapFilter(this.props.store.disciplines);
    return filtered;
  }

  getScore(user) {
    return user.summary ? user.summary.score : 0;
  }

  getSortedUser() {
    const sorted = _(this.props.store.users)
      .filter(x => this.getScore(x) > 0)
      .sortBy(this.getScore)
      .reverse()
      .value();

    return sorted.slice(1);
  }

  getHighestScore() {
    const max = _.max(this.props.store.users.map(this.getScore));
    return max;
  }

  render() {
    const highscore = this.getHighestScore();
    return (
      <Table hover striped>
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            {this.getDisciplines().map(disc => {
              return (
                <th key={disc._id} className={getClassName(disc.name)}>
                  {titleCase(disc.name)}
                </th>
              );
            })}
            <th className="hidden-xs">Triathlon</th>
          </tr>
        </thead>
        <tbody>
          {this.getSortedUser().map(user => (
            <CatchupItem
              key={user._id}
              user={user}
              summary={user.summary}
              disciplines={this.props.store.disciplines}
              highscore={highscore}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

CatchupList.fragments = {
  store: gql`
    fragment CatchupList_store on Store {
      disciplines {
        _id
        name
        ...CatchupItem_disciplines
      }
      users {
        _id
        ...CatchupItem_user
        summary(week: $week, year: $year) {
          score
          ...CatchupItem_summary
        }
      }
    }
    ${CatchupItem.fragments.disciplines}
    ${CatchupItem.fragments.user}
    ${CatchupItem.fragments.summary}
  `
};

export default CatchupList;
