import React from "react"

class Pos extends React.Component {
  getPostfix(){
    const digit = this.props.value % 10;
    switch (digit) {
      case 1: return (this.props.value % 100) === 11 ? "th" : "st";
      case 2: return (this.props.value % 100) === 12 ? "th" : "nd";
      case 3: return (this.props.value % 100) === 13 ? "th" : "rd";
      default: return "th"
    }
  }

  render(){
    return (
      <span>{this.props.value}{this.getPostfix()}</span>
    )
  }
}

export default Pos;