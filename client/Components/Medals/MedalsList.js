import React from "react";
import gql from "graphql-tag";
import { Table } from "react-bootstrap";
import _ from "lodash";

import { filterMedals } from "../../../shared/util";
import MedalsItem from "./MedalsItem";

class MedalsList extends React.Component {
  getSortedUsers() {
    const sorted = _(this.props.store.users)
      .sortBy([
        user => filterMedals(user.medals.goldWeeks, this.props.season).length,
        user => filterMedals(user.medals.silverWeeks, this.props.season).length,
        user => filterMedals(user.medals.bronzeWeeks, this.props.season).length
      ])
      .reverse()
      .value();

    return sorted;
  }

  render() {
    return (
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            <th className="col-xs-3">Gold</th>
            <th className="col-xs-3">Silver</th>
            <th className="col-xs-3">Bronze</th>
          </tr>
        </thead>
        <tbody>
          {this.getSortedUsers().map((user, index) => (
            <MedalsItem
              key={user._id}
              user={user}
              pos={index + 1}
              season={this.props.season}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

MedalsList.fragments = {
  store: gql`
    fragment MedalsList_store on Store {
      users {
        id
        ...MedalsItem_user
        _id
        medals {
          goldWeeks
          silverWeeks
          bronzeWeeks
        }
      }
    }
    ${MedalsItem.fragments.user}
  `,
  season: gql`
    fragment MedalsList_season on Season {
      from
      to
    }
  `
};

export default MedalsList;
