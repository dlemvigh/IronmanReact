import React from "react"
import Relay from "react-relay"
import { ControlLabel, Form, FormGroup, FormControl } from "react-bootstrap"

class ControlDiscipline extends React.Component {
    static propTypes = {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
    }

    isValid(){
        return this.getValidationState() === "success";
    }

    getValidationState() {
        if (this.props.value.length > 0) return "success";
    }

    onChange = (event) => {
        const options = event.target.selectedOptions;
        if (options.length == 1 && this.props.onChange) {

            const [selected] = options;
            this.props.onChange({
                ...selected.dataset
            });
        }
        const discipline = event.target.value;
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                <ControlLabel>Discipline</ControlLabel>
                <FormControl
                    defaultValue={this.props.value || ""} 
                    placeholder="distance" 
                    onBlur={this.onChange}
                    componentClass="select">
                    <option disabled value="">Choose...</option>
                    { this.props.store.disciplines.map(discipline => 
                        <option 
                            key={discipline.id} 
                            value={discipline.id}
                            data-id={discipline._id}
                            data-name={discipline.name}
                            data-unit={discipline.unit}
                            data-score={discipline.score}>{discipline.name}</option>) }
                </FormControl>
            </FormGroup>
        );
    }
}

ControlDiscipline = Relay.createContainer(ControlDiscipline, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                disciplines {
                    _id
                    id
                    name
                    unit
                    score
                }
            }
        `
    }
})

export default ControlDiscipline