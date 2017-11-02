import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import ReactCSSTransitionReplace from "react-css-transition-replace";

import { auth } from '../../Auth/Auth';
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import PersonalGoals from "../PersonalGoals/PersonalGoals";
import styles from "../../Styles/HorizontalCarousel.scss";

class Activity extends React.Component {

  state = {
    editing: null
  }

  onBeginEdit = (activity) => {
    this.setState({editing: activity});
  }

  onEndEdit = () => {
    this.setState({editing: null});
  }

  getName = () => {
    return `${this.props.user.name}${this.props.user.name.endsWith('s') ? "'" : "'s"}`;
  }

  render() {
    const profile = auth.getProfile();
    const component = this.state.editing === null ? 
      (<ActivityForm 
        {...this.props} 
        show={this.state.editing === null} 
        activity={null}
      />) : 
      (<ActivityForm
        {...this.props} 
        key={this.state.editing._id}
        show={this.state.editing !== null} 
        activity={this.state.editing}
        onEditDone={this.onEndEdit} 
      />);
    return (
      <div>
        <h3>{this.getName()} activities</h3>
        {(profile.username == this.props.user.username || true) && <ReactCSSTransitionReplace
          transitionName={styles}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          { component }
        </ReactCSSTransitionReplace>}
        {(profile.username == this.props.user.username) && <PersonalGoals user={this.props.user} />}
        <ActivityList {...this.props} onEdit={this.onBeginEdit} />
      </div>
    );
  }
}

Activity = createFragmentContainer(Activity, {
  store: graphql`
    fragment Activity_store on Store {
      ...ActivityForm_store
      ...ActivityList_store
    }
  `,
  user: graphql`
    fragment Activity_user on User {
      name
      username
      ...ActivityForm_user
      ...ActivityList_user
      ...PersonalGoals_user
    }
  `
});

export default Activity;