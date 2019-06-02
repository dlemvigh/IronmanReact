import React from "react";
import { FormLabel, FormGroup, FormControl } from "react-bootstrap";

export default class ControlScore extends React.Component {

  round(){
    return Math.round(this.props.value * 100) / 100 || 0;
  }

  render() {
    return (
      <FormGroup>
        <FormLabel>Score</FormLabel>
        <FormControl
          type="text"
          value={this.round()}
          disabled={this.props.readonly}
          data-test="form-output-score"
        />
      </FormGroup>
    );
  }
}