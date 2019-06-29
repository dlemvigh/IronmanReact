import React from "react";
import gql from "graphql-tag";

import ControlUser from "../Common/ControlUser";

const SyncAthlete = ({ users }) => (
  <div>
    <ControlUser users={users} />
  </div>
);

SyncAthlete.fragments = {
  users: gql`
    fragment SyncAthlete_users on User {
      ...ControlUser_users
    }
    ${ControlUser.fragments.users}
  `
};

export default SyncAthlete;
