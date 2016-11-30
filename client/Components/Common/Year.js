import React from "react";
import Moment from "moment";

export default class Year extends React.Component {
  getYear(){
    return Moment(this.props.value).weekYear();
  }

  render() {
    return <span>{this.getYear()}</span>;
  }
}