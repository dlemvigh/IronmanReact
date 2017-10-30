import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import { ControlLabel, FormGroup } from "react-bootstrap";

class ControlDiscipline extends React.Component {

  isValid(){
    return this.props.value.length > 0;
  }

  getValidationState() {
    return this.isValid() ? null : "error";
  }

  onChange = (event) => {
    const options = event.target.selectedOptions;
    if (options.length == 1 && this.props.onChange) {
      this.props.onChange(options[0].dataset);
    }
  }

  getName(disciplineName) {
    return disciplineName[0].toUpperCase() + disciplineName.substr(1);
  }

  render() {
    return (
      <FormGroup validationState={this.getValidationState()}>
        <ControlLabel>Discipline</ControlLabel>
        <select className="form-control"
          value={this.props.value || ""} 
          placeholder="distance" 
          onChange={this.onChange}
          onBlur={this.onChange}
        >
          { 
            this.props.store.disciplines.map(discipline => (
              <option 
                key={discipline._id} 
                value={discipline._id}
                data-id={discipline._id}
                data-name={discipline.name}
                data-unit={discipline.unit}
                data-score={discipline.score}
              >{this.getName(discipline.name)}</option>))
          }
        </select>
      </FormGroup>
    );
  }
}

ControlDiscipline = createFragmentContainer(ControlDiscipline, {
  store: graphql`
    fragment ControlDiscipline_store on Store {
      disciplines {
        _id
        name
        unit
        score
      }
    }
  `
});

export default ControlDiscipline;