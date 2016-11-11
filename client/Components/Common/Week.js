import React from "react"
import Moment from "moment"

export default class Week extends React.Component {
    getWeek(){
        return Moment(this.props.value).isoWeek();
    }

    render() {
        return <span>{this.getWeek()}</span>;
    }
}