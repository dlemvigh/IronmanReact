import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

import AddSeason from "./AddSeason";
import AddUser from "./AddUser";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <AddUser relay={this.props.relay} />
        <AddSeason relay={this.props.relay} />
      </div>
    );
  }
}

Admin = createFragmentContainer(Admin, {
  store: graphql`
    fragment Admin_store on Store {
      id
    }
  `
});

export const AdminQuery = graphql`
query AdminQuery {
  store {
    ...Admin_store
  }
}
`;

export default Admin;