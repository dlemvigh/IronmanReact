import React from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import gql from "graphql-tag";

const ControlUser = ({ users }) => (
  <FormGroup>
    <FormLabel>User</FormLabel>
    <select className="form-control" name="user" type="select">
      <option value="" />
      {users.map(({ name, username }) => (
        <option key={username} value={username}>
          {name}
        </option>
      ))}
    </select>
  </FormGroup>
);

ControlUser.fragments = {
  users: gql`
    fragment ControlUser_users on User {
      id
      name
      username
    }
  `
};

export default ControlUser;
