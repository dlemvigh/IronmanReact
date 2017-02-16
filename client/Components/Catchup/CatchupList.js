import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import titleCase from "title-case";

import { mapFilter, getClassName } from "./CatchupFilter"; 
import CatchupItem from "./CatchupItem";

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
      <Table>
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            {
              this.getDisciplines().map(disc => {
                return <th key={disc._id} className={getClassName(disc.name)}>{titleCase(disc.name)}</th>;
              })
            }
            <th className="hidden-xs">Triathlon</th>
          </tr>
        </thead>
        <tbody>
          {
            this.getSortedUser().map(user => <CatchupItem 
              key={user._id} 
              user={user} 
              summary={user.summary} 
              disciplines={this.props.store.disciplines} 
              highscore={highscore} 
            />)                                                
          }
        </tbody>
      </Table>
    );
  }
}

CatchupList = Relay.createContainer(CatchupList, {
  initialVariables: {
    week: moment().isoWeek(),
    year: moment().year() 
  },
  fragments: {
    store: () => Relay.QL`
      fragments on Store {
        disciplines {
          _id
          name
          ${CatchupItem.getFragment("disciplines")}
        }
        users {
          _id
          ${CatchupItem.getFragment("user")}
          summary(week: $week, year: $year) {
            score
            ${CatchupItem.getFragment("summary")}
          }
        }
      }
    `
  }
});

export default CatchupList;