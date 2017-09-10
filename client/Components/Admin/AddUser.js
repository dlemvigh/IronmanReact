import React from "react";
import Relay from "react-relay";
import { Button, ControlLabel, FormControl, FormGroup, Row, Col } from "react-bootstrap";
import toastr from "toastr";

import AddUserMutation from "../../Mutations/AddUserMutation";

class AddUser extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
  }

  defaultState = {
    name: "",
    username: "",
    isValid: false
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    const newState = {
      ...this.state,
      [name]: value,
    };

    newState.isValid = this.validate(newState);

    this.setState(newState);    
  }

  validate = (state) => {
    return !!(state.name && state.username);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      username: this.state.username
    };

    if (this.validate(user)) {
      Relay.Store.commitUpdate(
        new AddUserMutation(user), {
          onFailure: (resp) => { console.error("fail", resp); toastr.error("Update activity failed"); },
          onSuccess: () => { toastr.success("User added (F5)"); this.clear(); }
        }
      );
    }    
  } 

  clear = () => {
    this.setState(this.defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add user</h2>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
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
              <ControlLabel>Username</ControlLabel>
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
        <Button 
          type="button"
          onClick={this.clear}
        >Clear</Button>          
        <Button 
          type="submit" 
          bsStyle="primary"
          disabled={!this.state.isValid}
        >Submit</Button>
      </form>
    );
  }
}

export default AddUser;