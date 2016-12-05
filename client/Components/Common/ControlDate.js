import React from "react";
import { ControlLabel, FormGroup } from "react-bootstrap";
import DateTime from "react-datetime";
import MobileDetect from "mobile-detect";
import moment from "moment";

export default class ControlDate extends React.Component {

  isMobile(){
    const md = new MobileDetect(window.navigator.userAgent);
    return !!md.mobile();
  }

  isValid(){
    return this.getValidationState() === "success";
  }

  getValidationState() {
    if (typeof this.props.value === "string") {
      if (this.props.value.length > 0) { return "error"; }
    }else{
      return "success";
    }
  }

  getValue = () => {
    debugger;
    return this.props.value.format("YYYY-MM-DD");
  }

  onChangeMobile = (event) => {
    if (this.props.onChange) {
      const m = new moment(event.target.value);
      const value = m.startOf("day");
      this.props.onChange(value);
    }
  }

  onChange = (value) => {
    debugger
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
        {
          this.isMobile() 
          ? 
          <input type="date" className="form-control" value={this.getValue()} onChange={this.onChangeMobile} />
          :
          <DateTime
            dateFormat="D/M-YYYY"
            timeFormat={false}
            defaultValue={moment.utc()}
            value={this.props.value}
            onChange={this.onChange}
          />
        }
      </FormGroup>
    );
  }
}   