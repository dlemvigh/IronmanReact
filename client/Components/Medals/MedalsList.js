import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import _ from "lodash";

import MedalsItem from "./MedalsItem";

class MedalsList extends React.Component {

  getSortedUsers() {
    const sorted = _(this.props.store.users)
      .sortBy([
        user => user.medals.gold,
        user => user.medals.silver,
        user => user.medals.bronze
      ])
      .reverse()
      .value();
    return sorted;
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
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
            gold
            silver
            bronze
          }
        }
      }
    `
  }
});

export default MedalsList;