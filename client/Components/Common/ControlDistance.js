import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import CSSModules from "react-css-modules";

import styles from "./ControlDistance.modules.scss";

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
      return this.props.ensureValidation ? "is-invalid" : null;
    }
    return this.isValid() ? null : "is-invalid";
  }

  render() {
    return (
      <Form.Group>
        <Form.Label>Distance</Form.Label>
        <InputGroup>
          <Form.Control 
            type="number" 
            value={this.props.value}
            onChange={this.onChange}
            autoFocus
            styleName="distance-input" 
            className={this.getValidationState()}
            data-test="form-input-distance"
          />
          <InputGroup.Append>
            <InputGroup.Text>
              {this.props.unit}
            </InputGroup.Text>            
          </InputGroup.Append>
        </InputGroup>                    
      </Form.Group>
    );
  }
}

ControlDistance = CSSModules(ControlDistance, styles);

export default ControlDistance;