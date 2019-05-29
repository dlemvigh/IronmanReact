import React from "react";
import gql from "graphql-tag";

import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import PersonalGoals from "../PersonalGoals/PersonalGoals";

class Activity extends React.Component {
  state = {
    editing: null
  };

  onBeginEdit = activity => {
    this.setState({ editing: activity });
  };

  onEndEdit = () => {
    this.setState({ editing: null });
  };

  getName = () => {
    return `${this.props.user.name}${
      this.props.user.name.endsWith("s") ? "'" : "'s"
    }`;
  };

  render() {
    // const component = null;
    const component =
      this.state.editing === null ? (
        <ActivityForm
          {...this.props}
          show={this.state.editing === null}
          activity={null}
        />
      ) : (
        <ActivityForm
          {...this.props}
          key={this.state.editing._id}
          show={this.state.editing !== null}
          activity={this.state.editing}
          onEditDone={this.onEndEdit}
        />
      );
    return (
      <div>
        <h3>{this.getName()} activities</h3>
        {component}
        <PersonalGoals user={this.props.user} />
        <ActivityList {...this.props} onEdit={this.onBeginEdit} />
      </div>
    );
  }
}

Activity.fragments = {
  store: gql`
    fragment Activity_store on Store {
      id
      ...ActivityForm_store
      ...ActivityList_store
    }
    ${ActivityForm.fragments.store}
    ${ActivityList.fragments.store}
  `,
  user: gql`
    fragment Activity_user on User {
      name
      username
      ...ActivityForm_user
      ...ActivityList_user
      ...PersonalGoals_user
    }
    ${ActivityForm.fragments.user}
    ${ActivityList.fragments.user}
    ${PersonalGoals.fragments.user}
  `
};

export default Activity;
