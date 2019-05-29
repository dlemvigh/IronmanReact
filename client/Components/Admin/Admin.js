import React from "react";
import gql from "graphql-tag";

import AddSeason from "./AddSeason";
import AddUser from "./AddUser";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <AddUser />
        <AddSeason />
      </div>
    );
  }
}

Admin = Relay.createContainer(Admin, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
      }
    `
  }
});

export default Admin;