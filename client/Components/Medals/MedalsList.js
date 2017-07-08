import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";

import { getYearWeekId } from "../../../shared/util";
import MedalsItem from "./MedalsItem";

class MedalsList extends React.Component {

  filterMedals(medals) {
    const currentWeek = getYearWeekId(moment().year(), moment().isoWeek());
    const from = this.props.season.from;
    const to = this.props.season.to;
    return medals.filter(x => x < currentWeek && from <= x && x <= to)
  }

  getSortedUsers() {
    const users = this.props.store.users.map(user => {
      user.medals.goldWeeks = this.filterMedals(user.medals.goldWeeks),
      user.medals.silverWeeks = this.filterMedals(user.medals.silverWeeks),
      user.medals.bronzeWeeks = this.filterMedals(user.medals.bronzeWeeks)
      return user;
    });
    const sorted = _(this.props.store.users)
      .sortBy([
        user => user.medals.goldWeeks.length,
        user => user.medals.silverWeeks.length,
        user => user.medals.bronzeWeeks.length
      ])
      .reverse()
      .value();
    return sorted;
  }

  render() {
    return (
      <Table hover striped>
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            <th className="col-xs-3">Gold</th>
            <th className="col-xs-3">Silver</th>
            <th className="col-xs-3">Bronze</th>
          </tr>
        </thead>
        <tbody>
          {
            this.getSortedUsers().map((user, index) => {
              return <MedalsItem key={user._id} user={user} pos={index + 1} medals={user.medals} />;
            })
          }
        </tbody>
      </Table>
    );
  }
}

MedalsList = Relay.createContainer(MedalsList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users {
          ${MedalsItem.getFragment("user")}
          _id
          medals {
            goldWeeks
            silverWeeks
            bronzeWeeks
          }
        }
      }
    `,
    season: () => Relay.QL`
      fragment on Season {
        from
        to
      }
    `
  }
});

export default MedalsList;