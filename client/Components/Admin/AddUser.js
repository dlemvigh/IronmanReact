import React from "react";
import { Mutation } from "react-apollo";
import {
  Button,
  FormLabel,
  FormControl,
  FormGroup,
  Row,
  Col
} from "react-bootstrap";
import gql from "graphql-tag";
import toastr from "toastr";

class AddUser extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
  }

  defaultState = {
    name: "",
    username: "",
    isValid: false
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    const newState = {
      ...this.state,
      [name]: value
    };

    newState.isValid = this.validate(newState);

    this.setState(newState);
  };

  validate = state => {
    return !!(state.name && state.username);
  };

  clear = () => {
    this.setState(this.defaultState);
  };

  render() {
    return (
      <Mutation
        mutation={gql`
          mutation AddUser($input: AddUserInput!) {
            addUser(input: $input) {
              store {
                id
                users {
                  id
                }
              }
              user {
                id
                name
                username
                active
              }
            }
          }
        `}
      >
        {addUser => {
          const handleSubmit = event => {
            event.preventDefault();

            const user = {
              name: this.state.name,
              username: this.state.username
            };

            if (this.validate(user)) {
              addUser({
                variables: {
                  input: user
                }
              }).then(
                () => toastr.success("Added user"),
                () => toastr.error("Failed to add user")
              );
            }
          };

          return (
            <form onSubmit={handleSubmit}>
              <h2>Add user</h2>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                      name="name"
                      type="text"
                      placeholder="Display name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl
                      name="username"
                      type="text"
                      placeholder="Unique url username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button variant="secondary" type="button" onClick={this.clear}>
                Clear
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!this.state.isValid}
              >
                Submit
              </Button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default AddUser;
