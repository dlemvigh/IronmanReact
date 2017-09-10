import React from "react";

export default class Score extends React.Component {
  round(){
    return Math.round(this.props.value * 10) / 10 || 0;
  }

  render() {
    return (
      <span>{ this.round() }</span>
    );
  }
}