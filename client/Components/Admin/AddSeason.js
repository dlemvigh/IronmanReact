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

// import AddSeasonMutation from "../../Mutations/AddSeasonMutation";

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
    return !!(state.name && state.url && state.from && state.to);
  };

  clear = () => {
    this.setState(this.defaultState);
  };

  render() {
    return (
      <Mutation
        mutation={gql`
          mutation AddSeason($input: AddSeasonInput!) {
            addSeason(input: $input) {
              store {
                id
                allSeasons {
                  id
                  _id
                }
              }
              season {
                id
                _id
                name
                url
                from
                to
              }
            }
          }
        `}
      >
        {addSeason => {
          const handleSubmit = event => {
            event.preventDefault();

            const season = {
              name: this.state.name,
              url: this.state.url,
              from: Number(this.state.from),
              to: Number(this.state.to)
            };

            if (this.validate(season)) {
              addSeason({
                variables: {
                  input: season
                }
              });
            }
          };

          return (
            <form onSubmit={handleSubmit}>
              <h2>Add season</h2>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Url</FormLabel>
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
                    <FormLabel>From</FormLabel>
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
                    <FormLabel>To</FormLabel>
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

export default AddSeason;
