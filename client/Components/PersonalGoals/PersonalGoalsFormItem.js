import React from "react";
import Relay from "react-relay";
import { Button, ControlLabel, FormControl, FormGroup, Glyphicon, Row, Col } from "react-bootstrap";
import CSSModules from "react-css-modules";

import styles from "./PersonalGoalsFormItem.scss";

class PersonalGoalsFormItem extends React.Component {

  isEnabledDist() {
    return !!this.props.goal.disc;
  }

  isEnabledScore() {
    return !this.props.goal.disc;
  }

  onChangeDisc = (event) => {
    const goal = {...this.props.goal};
    goal.disc = event.target.value;
    if (goal.disc && goal.type == "score") {
      goal.type = "dist";
    } else if (!goal.disc && goal.type == "disc") {
      goal.type = "score";
    }
    this.props.update(goal, this.props.index);    
  }

  onChange = (event) => {
    const goal = {...this.props.goal};
    goal[event.target.name] = event.target.value;
    this.props.update(goal, this.props.index);
  }

  onClickUp = () => {
    const index = this.props.index;
    if (index > 0) {
      this.props.swap(index, index - 1);
    }
  }

  onClickRemove = () => {
    this.props.remove(this.props.index);
  }

  onClickDown = () => {
    const index = this.props.index;
    if (index + 1 < this.props.numGoals) {
      this.props.swap(index, index + 1);
    }
  }

  getUnit() {
    const discId = this.props.goal.disc;
    const discipline = this.props.store.disciplines.find(x => x._id == discId);
    return discipline ? discipline.unit : "points";
  }

  getIconStyles(icon) {
    if (icon.up && this.props.index == 0) {
      return "disabled";
    }
    if (icon.down && this.props.index + 1 == this.props.numGoals) {
      return "disabled";
    }
    return "pointer";
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={12} sm={4}>
            <FormGroup>
              <ControlLabel>I want to</ControlLabel>
              <select
                name="disc" 
                className="form-control"
                value={this.props.goal.disc || ""}
                onChange={this.onChangeDisc}
              >
                {
                  this.props.store.disciplines.map(disc => (
                    <option 
                      key={disc._id}
                      value={disc._id}
                    >
                      {disc.name}
                    </option>
                  ))
                }
                <option value="">any exercise</option>
              </select>
            </FormGroup>
          </Col>
          <Col xs={4} sm={3}>
            <FormGroup>
              <ControlLabel>At least</ControlLabel>
              <FormControl
                name="value"
                type="text"
                value={this.props.goal.value}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4}>
            <FormGroup>
              <ControlLabel>per week</ControlLabel>
              <select 
                name="type"
                className="form-control"
                value={this.props.goal.type}
                onChange={this.onChange}
              >
                <option value="count">times</option>
                {this.isEnabledDist() && <option value="dist">{this.getUnit()}</option>}
                {this.isEnabledScore() && <option value="score">score</option>}
              </select>
            </FormGroup>
          </Col>
          <Col xs={1}>
            <div styleName="icons">
              <Glyphicon glyph="chevron-up" styleName={this.getIconStyles({up: true})} onClick={this.onClickUp} />
              <Glyphicon glyph="trash" styleName={this.getIconStyles({})} onClick={this.onClickRemove} />
              <Glyphicon glyph="chevron-down" styleName={this.getIconStyles({down: true})} onClick={this.onClickDown} />
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PersonalGoalsFormItem = CSSModules(PersonalGoalsFormItem, styles, { allowMultiple: true });

PersonalGoalsFormItem = Relay.createContainer(PersonalGoalsFormItem, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        disciplines {
          _id
          name
          unit
        }
      }
    `
  }
});

export default PersonalGoalsFormItem; 