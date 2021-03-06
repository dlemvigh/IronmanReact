import React from "react";
import gql from "graphql-tag";
import { FormLabel, FormControl, FormGroup, Row, Col } from "react-bootstrap";
import CSSModules from "react-css-modules";

import Icon from "../Common/Icon";
import styles from "./PersonalGoalsFormItem.modules.scss";

class PersonalGoalsFormItem extends React.Component {
  isEnabledDist() {
    return !!this.props.goal.disc;
  }

  isEnabledScore() {
    return !this.props.goal.disc;
  }

  onChangeDisc = event => {
    const goal = { ...this.props.goal };
    goal.disc = event.target.value;
    if (goal.disc && goal.type == "score") {
      goal.type = "dist";
    } else if (!goal.disc && goal.type == "disc") {
      goal.type = "score";
    }
    this.props.update(goal, this.props.index);
  };

  onChange = event => {
    const goal = { ...this.props.goal };
    goal[event.target.name] = event.target.value;
    this.props.update(goal, this.props.index);
  };

  onClickUp = () => {
    const index = this.props.index;
    if (index > 0) {
      this.props.swap(index, index - 1);
    }
  };

  onClickRemove = () => {
    this.props.remove(this.props.index);
  };

  onClickDown = () => {
    const index = this.props.index;
    if (index + 1 < this.props.numGoals) {
      this.props.swap(index, index + 1);
    }
  };

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
      <form onSubmit={this.props.save}>
        <Row>
          <Col xs={12} sm={4}>
            <FormGroup>
              <FormLabel>I want to</FormLabel>
              <select
                name="disc"
                className="form-control"
                value={this.props.goal.disc || ""}
                onChange={this.onChangeDisc}
              >
                {this.props.store &&
                  this.props.store.disciplines.map(disc => (
                    <option key={disc._id} value={disc._id}>
                      {disc.name}
                    </option>
                  ))}
                <option value="">any exercise</option>
              </select>
            </FormGroup>
          </Col>
          <Col xs={4} sm={3}>
            <FormGroup>
              <FormLabel>At least</FormLabel>
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
              <FormLabel>per week</FormLabel>
              <select
                name="type"
                className="form-control"
                value={this.props.goal.type}
                onChange={this.onChange}
              >
                <option value="count">times</option>
                {this.isEnabledDist() && (
                  <option value="dist">{this.getUnit()}</option>
                )}
                {this.isEnabledScore() && <option value="score">score</option>}
              </select>
            </FormGroup>
          </Col>
          <Col xs={1}>
            <div styleName="icons">
              <a
                styleName={this.getIconStyles({ up: true })}
                href="javascript:void(0)"
                onClick={this.onClickUp}
              >
                <Icon name="up" />
              </a>
              <a
                styleName={this.getIconStyles({})}
                href="javascript:void(0)"
                onClick={this.onClickRemove}
              >
                <Icon name="delete" />

              </a>
              <a
                styleName={this.getIconStyles({ down: true })}
                href="javascript:void(0)"
                onClick={this.onClickDown}
              >
                <Icon name="down" />
              </a>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PersonalGoalsFormItem = CSSModules(PersonalGoalsFormItem, styles, {
  allowMultiple: true
});

PersonalGoalsFormItem.fragments = {
  store: gql`
    fragment PersonalGoalsFormItem_store on Store {
      disciplines {
        id
        _id
        name
        unit
      }
    }
  `
};

export default PersonalGoalsFormItem;
