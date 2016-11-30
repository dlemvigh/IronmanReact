import React from "react";
import Moment from "moment";

export default class Date extends React.Component {
    getDate(){
        return Moment(this.props.value).format("D/M");
    }

    render() {
        return <span>{this.getDate()}</span>;
    }
}