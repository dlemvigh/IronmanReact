import React, { Component } from 'react';
import Relay from 'react-relay/classic';
import loading from './loading.svg';
import EnsureLoginMutation from "../../Mutations/EnsureLoginMutation";
// import history from '../../history';
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

        Relay.Store.commitUpdate(
          new EnsureLoginMutation(login), {
            onSuccess: (resp) => {
              props.auth.setActiveUser(resp.ensureLogin.user.username);
              // history.replace('/');
            }
          }
        );
      });
    } else {
      // history.replace('/');
    }
  }

  render() {
    const style = {
      // position: 'absolute',
      // display: 'flex',
      // justifyContent: 'center',
      // height: '100vh',
      // width: '100vw',
      // top: 0,
      // bottom: 0,
      // left: 0,
      // right: 0,
      // backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Callback;