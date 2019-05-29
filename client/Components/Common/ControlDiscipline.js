import React from "react";
import gql from "graphql-tag";
import { ControlLabel, FormGroup } from "react-bootstrap";

import DisciplineIcon from "./DisciplineIcon";
import isMobile from "./isMobile";

class ControlDiscipline extends React.Component {
  onChange = event => {
    const options = event.target.selectedOptions;
    if (options.length == 1 && this.props.onChange) {
      this.props.onChange(options[0].dataset);
    }
  };

  handleClick = discipline => {
    if (this.props.onChange) {
      this.props.onChange(discipline);
    }
  };

  getName(disciplineName) {
    return disciplineName[0].toUpperCase() + disciplineName.substr(1);
  }

  renderIcons() {
    return (
      <div className="visible-xs">
        {this.props.store.disciplines.map(discipline => (
          <span
            key={discipline._id}
            onClick={() => this.handleClick(discipline)}
          >
            <DisciplineIcon
              key={discipline._id}
              value={discipline.name}
              size="large"
              disabled={this.props.value !== discipline._id}
            />
          </span>
        ))}
      </div>
    );
  }

  renderDropdown() {
    return (
      <select
        className="form-control hidden-xs"
        value={this.props.value || ""}
        placeholder="distance"
        onChange={this.onChange}
        onBlur={this.onChange}
      >
        {this.props.store.disciplines.map(discipline => (
          <option
            key={discipline._id}
            value={discipline._id}
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
        <ControlLabel>Discipline</ControlLabel>
        {this.renderIcons()}
        {this.renderDropdown()}
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
          name
          unit
          score
        }
      }
    `
  }
});

export default ControlDiscipline;
