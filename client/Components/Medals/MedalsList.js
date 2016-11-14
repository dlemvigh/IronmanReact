import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import _ from "lodash";

import MedalsItem from "./MedalsItem";

class MedalsList extends React.Component {

  getSortedUsers() {
    const sorted = _(this.props.store.users.edges)
      .sortBy([
        edge => edge.node.medals.gold,
        edge => edge.node.medals.silver,
        edge => edge.node.medals.bronze
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
            this.getSortedUsers().map((edge, index) => {
              return <MedalsItem key={edge.node._id} user={edge.node} pos={index + 1} />;
            })
          }
        </tbody>
      </Table>
    )
  }
}

MedalsList = Relay.createContainer(MedalsList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users(first: 100) {
          edges {
            node {
              ${MedalsItem.getFragment('user')}
              _id
              medals {
                gold
                silver
                bronze
              }
            }
          }
        }
      }
    `
  }
})

export default MedalsList;