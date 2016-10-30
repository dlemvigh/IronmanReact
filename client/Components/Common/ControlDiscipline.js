import React from "react"
import Relay from "react-relay"
import { ControlLabel, Form, FormGroup, FormControl } from "react-bootstrap"

class ControlDiscipline extends React.Component {
    static propTypes = {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        disciplines: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                name: React.PropTypes.string.isRequired
            })
        ).isRequired   
    }

    isValid(){
        return this.getValidationState() === "success";
    }

    getValidationState() {
        if (this.props.value.length > 0) return "success";
    }

    onChange = (event) => {
        const discipline = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(discipline);
        }
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                <ControlLabel>Discipline</ControlLabel>
                <FormControl
                    defaultValue={this.props.value || ""} 
                    placeholder="distance" 
                    onChange={this.onChange} 
                    componentClass="select">
                    <option disabled value="">Choose...</option>
                    { this.props.disciplines.map(item => 
                        <option key={item.id} value={item.id}>{item.name}</option>) }
                </FormControl>
            </FormGroup>
        );
    }
}

// ControlDiscipline = Relay.createContainer(ControlDiscipline, {
//     fragments: {
//         // disciplines: () => Relay.QL`
//         //     fragment on Discipline {
//         //         id
//         //         name
//         //     }
//         // `
//     }
// })

export default ControlDiscipline