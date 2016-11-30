import React from "react";
import { ControlLabel, FormGroup, FormControl } from "react-bootstrap";

export default class ControlScore extends React.Component {

    round(){
        return Math.round(this.props.value * 100) / 100 || 0;
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Score</ControlLabel>
                <FormControl
                    type="text"
                    value={this.round()}
                    disabled={this.props.readonly} 
                />
        </FormGroup>
        );
    }
}