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
                    onChange={this.onChange} 
                    componentClass="select">
                    <option disabled value="">Choose...</option>
                    { this.props.store.disciplines.edges.map(edge => 
                        <option 
                            key={edge.node.id} 
                            value={edge.node.id}
                            data-id={edge.node._id}
                            data-name={edge.node.name}
                            data-unit={edge.node.unit}
                            data-score={edge.node.score}>{edge.node.name}</option>) }
                </FormControl>
            </FormGroup>
        );
    }
}

ControlDiscipline = Relay.createContainer(ControlDiscipline, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                disciplines(first: 100) {
                    edges {
                        node {
                            _id
                            id
                            name
                            unit
                            score
                        }
                    }
                }
            }
        `
    }
})

export default ControlDiscipline