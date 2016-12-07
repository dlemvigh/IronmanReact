import React from "react";
import Relay from "react-relay";
import ReactCSSTransitionReplace from "react-css-transition-replace";

import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";

import styles from "./Activity.scss";

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

  render() {
    const component = this.state.editing === null ? 
          <ActivityForm 
            {...this.props} 
            show={this.state.editing === null} 
            activity={null}
          /> : 
          <ActivityForm
            {...this.props} 
            key={this.state.editing._id}
            show={this.state.editing !== null} 
            activity={this.state.editing}
            onEditDone={this.onEndEdit} 
          />
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <ReactCSSTransitionReplace
          transitionName={styles}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          { component }
        </ReactCSSTransitionReplace>
        <h3>Activities</h3>
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
        ${ActivityForm.getFragment("user")}
        ${ActivityList.getFragment("user")}
      }
    `
  }
});

export default Activity;