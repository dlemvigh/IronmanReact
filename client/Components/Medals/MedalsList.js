import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
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
            this.getSortedUsers().map((user, index) => (
              <MedalsItem key={user._id} user={user} pos={index + 1} season={this.props.season} />
            ))
          }
        </tbody>
      </Table>
    );
  }
}

MedalsList = createFragmentContainer(MedalsList, {
  store: graphql`
    fragment MedalsList_store on Store {
      users {
        _id
        medals {
          goldWeeks
          silverWeeks
          bronzeWeeks
        }
        ...MedalsItem_user
      }
    }
  `,
  season: graphql`
    fragment MedalsList_season on Season {
      from
      to
    }
  `
});

export default MedalsList;