import React, { Component } from "react";
import Loading from "react-loading-bar";
import "!style-loader!css-loader!react-loading-bar/dist/index.css";

export default class LoadingExample extends Component {
  render() {
    return <Loading show color="red" />;
  }
}
