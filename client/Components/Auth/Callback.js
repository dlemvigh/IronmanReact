import React, { Component } from 'react';

import { auth } from '../../Auth/Auth';
import environment from '../../environment';
import EnsureLoginMutation from "../../Mutations/EnsureLoginMutation";

import loading from './loading.svg';

class Callback extends Component {
  constructor(props) {
    super(props);
    debugger
    if (/access_token|id_token|error/.test(props.location.hash)) {
      auth.handleAuthentication((profile) => {  
        const login = {
          username: profile.username,
          provider: profile.provider,
          providerUserId: profile.providerUserId
        };

        EnsureLoginMutation.commit(
          environment,
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