import React from "react";
import { FormLabel, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import CSSModules from "react-css-modules";

import styles from "./ControlDistance.scss";

const regex = /^((\d+\.?\d*)|(\d*\.?\d+))$/;

class ControlDistance extends React.Component {

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
        <FormLabel>Distance</FormLabel>
        <InputGroup>
          <FormControl 
            type="number" 
            value={this.props.value}
            placeholder="4.7" 
            onChange={this.onChange}
            autoFocus
            styleName="distance-input" 
          />
          <InputGroup.Addon>{this.props.unit}</InputGroup.Addon>
        </InputGroup>                    
      </FormGroup>
    );
  }
}

ControlDistance = CSSModules(ControlDistance, styles);

export default ControlDistance;