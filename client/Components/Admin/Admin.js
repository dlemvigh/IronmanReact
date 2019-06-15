import React from "react";

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

export default Admin;