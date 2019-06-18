import React from "react";
// import { Query } from "react-apollo";
import gql from "graphql-tag";

import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import PersonalGoals from "../PersonalGoals/PersonalGoals";
import { MyQuery } from "../Common/ApolloLoader";

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
    const { user } = this.props;
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
        <MyQuery
          query={gql`
            query ActivityQuerySplit($username: String!) {
              store {
                id
                ...ActivityList_store
              }
              user (username: $username) {
                id
                ...ActivityList_user
                ...PersonalGoals_user
              }
            }
            ${ActivityList.fragments.store}
            ${ActivityList.fragments.user}
            ${PersonalGoals.fragments.user}
          `}
          variables={{ username: user.username }}
        >
          {({ store, user }) => (
            <React.Fragment>
              <PersonalGoals user={user} />
              <ActivityList store={store} user={user} onEdit={this.onBeginEdit} />
            </React.Fragment>
          )}
        </MyQuery>
      </div>
    );
  }
}

Activity.fragments = {
  store: gql`
    fragment Activity_store on Store {
      id
      ...ActivityForm_store
    }
    ${ActivityForm.fragments.store}
  `,
  user: gql`
    fragment Activity_user on User {
      name
      username
      ...ActivityForm_user
    }
    ${ActivityForm.fragments.user}
  `
};

export default Activity;
