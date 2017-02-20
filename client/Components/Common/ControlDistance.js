import React from "react";
import { ControlLabel, FormGroup, FormControl, InputGroup } from "react-bootstrap";

const regex = /^((\d+\.?\d*)|(\d*\.?\d+))$/;

export default class ControlDistance extends React.Component {

  onChange = (event) => {
    const distance = event.target.value;
    if (this.props.onChange) {
      this.props.onChange(distance);
    }
  }
    
  isValid(){
    return regex.test(this.props.value) && Number(this.props.value) > 0;
  }

  getValidationState() { 
    if (String(this.props.value).length == 0) {
      return this.props.ensureValidation ? "error" : null;
    }
    return this.isValid() ? null : "error";
  }

  render() {
    return (
      <FormGroup validationState={this.getValidationState()}>
        <ControlLabel>Distance</ControlLabel>
        <InputGroup>
          <FormControl 
            type="text" 
            value={this.props.value}
            placeholder="4.7" 
            onChange={this.onChange}
            autoFocus
          />
          <InputGroup.Addon>{this.props.unit}</InputGroup.Addon>
        </InputGroup>                    
      </FormGroup>
    );
  }
}