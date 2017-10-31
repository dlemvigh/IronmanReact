import React from "react";
import { Button, ControlLabel, FormControl, FormGroup, Row, Col } from "react-bootstrap";
import toastr from "toastr";

import AddSeasonMutation from "../../Mutations/AddSeasonMutation";

class AddSeason extends React.Component {
  constructor() {
    super();
    this.state = this.defaultState;
  }

  defaultState = {
    name: "",
    url: "",
    from: "",
    to: "",
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
    return !!(state.name && state.url && state.from && state.to);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const season = {
      name: this.state.name,
      url: this.state.url,
      from: this.state.from,
      to: this.state.to
    };

    if (this.validate(season)) {
      AddSeasonMutation.commit(
        this.props.relay.environment,
        season,
        {
          onError: (resp) => { console.error("fail", resp); toastr.error("Update activity failed"); },
          onCompleted: () => { toastr.success("Season added (F5)"); this.clear(); }          
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
        <h2>Add season</h2>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name="name"
                type="text"
                placeholder="Season name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>Url</ControlLabel>
              <FormControl
                name="url"
                type="text"
                placeholder="Season url"
                value={this.state.url}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>From</ControlLabel>
              <FormControl
                name="from"
                type="number"
                placeholder="yyyyww e.g. 201704"
                value={this.state.from}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <ControlLabel>To</ControlLabel>
              <FormControl
                name="to"
                type="number"
                placeholder="yyyyww e.g. 201751"
                value={this.state.to}
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

export default AddSeason;