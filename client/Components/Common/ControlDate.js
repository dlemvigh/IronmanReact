import React from "react"
import { ControlLabel, FormGroup, FormControl } from "react-bootstrap"
import DateTime from "react-datetime"
import moment from "moment"

export default class ControlDate extends React.Component {

    isValid(){
        return this.getValidationState() === "success";
    }

    getValidationState() {
        if (typeof this.props.value === "string") {
            if (this.props.value.length > 0) return "error"
        }else{
            return "success"
        }
    }

    onChange = (value) => {
        if (typeof value !== "string") {
            value = value.startOf("day");
        }
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                <ControlLabel>Date</ControlLabel>
                <DateTime
                    dateFormat="D/M-YYYY"
                    timeFormat={false}
                    defaultValue={moment.utc()}
                    value={this.props.value}
                    onChange={this.onChange} 
                    />
            </FormGroup>
        );
    }
}   