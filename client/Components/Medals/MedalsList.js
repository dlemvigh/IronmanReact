import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";

import MedalsItem from "./MedalsItem";

class MedalsList extends React.Component {

  getSortedUsers() {
    const currentWeek = moment().week();
    const sorted = _(this.props.store.users)
      .sortBy([
        user => user.medals.goldWeeks.filter(x => x != currentWeek).length,
        user => user.medals.silverWeeks.filter(x => x != currentWeek).length,
        user => user.medals.bronzeWeeks.filter(x => x != currentWeek).length
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
              return <MedalsItem key={user._id} user={user} pos={index + 1} />;
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
    `
  }
});

export default MedalsList;