import React from "react";
import { Button } from "react-bootstrap";
import CSSModules from "react-css-modules";
import gql from "graphql-tag";
import toastr from "toastr";

import { client } from "../../apolloClient";
import useStravaAccessToken from "./useStravaAccessToken";
import SyncAthlete from "./SyncAthlete";
import SyncList from "./SyncList";
import styles from "./Sync.modules.scss";

const GET_ACTIVITIES = gql`
  query GetStravaActivities($access_token: String!) {
    strava {
      listActivities(access_token: $access_token)
    }
  }
`;

let Sync = props => {
  const access_token = useStravaAccessToken();

  const handleAuth = () => {
    window.location = "/strava";
  };

  const fetchLatest = () => {
    client
      .query({
        query: GET_ACTIVITIES,
        variables: { access_token }
      })
      .then(
        () => toastr.success("Fetched latest activities"),
        () => toastr.error("Failed to fetch latest activities")
      );
  };

  return (
    <React.Fragment>
      <h3>Strava sync</h3>
      <div styleName="buttons">
        <Button onClick={handleAuth}>Auth</Button>
        <Button>Get Athlete</Button>
        <Button onClick={fetchLatest}>Fetch activities</Button>
      </div>
      <h3>Athlete</h3>
      <SyncAthlete users={props.store.users} />
      <h3>Activities</h3>
      <SyncList syncLog={props.strava.syncLog} />
    </React.Fragment>
  );
};

Sync = CSSModules(Sync, styles);

Sync.fragments = {
  store: gql`
    fragment Sync_store on Store {
      users {
        ...SyncAthlete_users
      }
    }
    ${SyncAthlete.fragments.users}
  `,
  strava: gql`
    fragment Sync_strava on Strava {
      syncLog {
        ...SyncList_syncLog
      }
    }
    ${SyncList.fragments.syncLog}
  `
};

export default Sync;
