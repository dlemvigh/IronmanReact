import React, { Component } from 'react';
import Relay from 'react-relay/classic';
import loading from './loading.svg';
import EnsureLoginMutation from "../../Mutations/EnsureLoginMutation";

class Callback extends Component {
  constructor(props) {
    super(props);

    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication((profile) => {  
        const login = {
          username: profile.username,
          provider: profile.provider,
          providerUserId: profile.providerUserId
        };

        EnsureLoginMutation.commit(
          this.props.relay.environment,
          login,
          {
            onCompleted: (resp) => {
              props.auth.setActiveUser(resp.ensureLogin.user.username);
            }            
          }
        );
      });
    }
  }

  render() {
    return (
      <div>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Callback;