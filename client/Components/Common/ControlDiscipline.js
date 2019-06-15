import React from "react";
import gql from "graphql-tag";
import { FormLabel, FormGroup } from "react-bootstrap";

import DisciplineIcon from "./DisciplineIcon";

class ControlDiscipline extends React.Component {
  onChange = event => {
    const options = event.target.selectedOptions;
    if (options.length == 1 && this.props.onChange) {
      this.props.onChange(options[0].dataset);
    }
  };

  handleClick = discipline => {
    if (this.props.onChange) {
      const disc = {
        ...discipline,
        id: discipline._id,
      }
      this.props.onChange(disc);
    }
  };

  getName(disciplineName) {
    return disciplineName[0].toUpperCase() + disciplineName.substr(1);
  }

  renderIcons() {
    return (
      <div className="d-sm-none">
        {this.props.store.disciplines.map(discipline => (
          <span
            key={discipline._id}
            onClick={() => this.handleClick(discipline)}
          >
            <DisciplineIcon
              key={discipline._id}
              value={discipline.name}
              size="large"
              disabled={this.props.value !== discipline.name}
              data-test={`form-input-discipline-button-${discipline.name}`}
            />
          </span>
        ))}
      </div>
    );
  }

  renderDropdown() {
    return (
      <select
        className="form-control d-sm-inline d-none"
        value={this.props.value || ""}
        onChange={this.onChange}
        onBlur={this.onChange}
        data-test="form-input-discipline"
      >
        {this.props.store.disciplines.map(discipline => (
          <option
            key={discipline._id}
            value={discipline.name}
            data-id={discipline._id}
            data-name={discipline.name}
            data-unit={discipline.unit}
            data-score={discipline.score}
          >
            {this.getName(discipline.name)}
          </option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <FormGroup>
        <FormLabel>Discipline</FormLabel>
        {this.renderIcons()}
        {this.renderDropdown()}
      </FormGroup>
    );
  }
}

ControlDiscipline.fragments = {
  store: gql`
    fragment ControlDiscipline_store on Store {
      disciplines {
        id
        _id
        name
        unit
        score
      }
    }
  `
};

export default ControlDiscipline;
