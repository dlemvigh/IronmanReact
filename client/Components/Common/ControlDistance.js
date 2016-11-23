import React from "react";
import { ControlLabel, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap"

const regex = /^((\d+\.?\d*)|(\d*\.?\d+))$/;

export default class ControlDistance extends React.Component {

    onChange = (event) => {
        const distance = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(distance);
        }
    }
    
    isValid(){
        return this.getValidationState() === "success";
    }

    getValidationState() {                
        if (regex.test(this.props.value)) return "success";
        if (this.props.value.length > 0) return "error";
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
                        onChange={this.onChange}  />
                    <InputGroup.Addon>{this.props.unit}</InputGroup.Addon>
                </InputGroup>                    
            </FormGroup>
        );
    }
}