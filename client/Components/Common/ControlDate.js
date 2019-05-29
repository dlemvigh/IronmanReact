import React from "react";
import { FormLabel, FormGroup } from "react-bootstrap";
import DateTime from "react-datetime";
import MobileDetect from "mobile-detect";
import moment from "moment";
import CSSModules from "react-css-modules";

import styles from "./ControlDate.modules.scss";

const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])-20\d\d$/;

class ControlDate extends React.Component {

  isMobile(){
    const md = new MobileDetect(window.navigator.userAgent);
    return !!md.mobile();
  }

  isValid(){
    let value = this.props.value;
    if (typeof value !== "string") {
      value = value.format("D/M-YYYY");
    }
    const isValid = regex.test(this.props.value);
    return isValid;
  }

  getValidationState() {
    return this.isValid() ? null : "is-invalid";
  }

  getValue = () => {
    const value = this.props.value ? moment.utc(this.props.value, "D/M-YYYY").format("YYYY-MM-DD") : null;
    return value;
  }

  onChangeMobile = (event) => {
    if (this.props.onChange) {
      let value = event.target.value;
      if (value) {
        const m = moment.utc(event.target.value);
        value = m.startOf("day").format("D/M-YYYY");
      }
      this.props.onChange(value);
    }
  }

  onChange = (value) => {
    if (this.props.onChange) {
      if (typeof value === "string") {
        this.props.onChange(value);
      }else{
        this.props.onChange(value.format("D/M-YYYY"));
      }
    }
  }

  render() {
    return (
      <FormGroup>
        <FormLabel>Date</FormLabel>
        {
          this.isMobile() ? 
            <input 
              type="date" 
              className="form-control" 
              styleName="mobile-input" 
              value={this.getValue()} 
              onChange={this.onChangeMobile} 
            /> :
            <DateTime
              dateFormat="D/M-YYYY"
              timeFormat={false}
              value={this.props.value}
              onChange={this.onChange}
              className={this.getValidationState()}
            />
        }
      </FormGroup>
    );
  }
}   

ControlDate = CSSModules(ControlDate, styles);

export default ControlDate;