import React from "react";
import Relay from "react-relay";
import ReactCSSTransitionReplace from "react-css-transition-replace";

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
    const profile = this.props.auth.getProfile();
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
        {(profile.username == this.props.user.username) && <ReactCSSTransitionReplace
          transitionName={styles}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          { component }
        </ReactCSSTransitionReplace>}
        <PersonalGoals user={this.props.user} />
        <ActivityList {...this.props} onEdit={this.onBeginEdit} />
      </div>
    );
  }
}

Activity = Relay.createContainer(Activity, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${ActivityForm.getFragment("store")}
        ${ActivityList.getFragment("store")}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        name
        username
        ${ActivityForm.getFragment("user")}
        ${ActivityList.getFragment("user")}
        ${PersonalGoals.getFragment("user")}
      }
    `
  }
});

export default Activity;