import React from "react";
import { Button } from "react-bootstrap";
import CSSModules from "react-css-modules";
import gql from "graphql-tag";
import toastr from "toastr";

import { client } from "../../apolloClient";
import useStravaAccessToken from "./useStravaAccessToken";
import styles from "./Sync.modules.scss";

const GET_ACTIVITIES = gql`
  query GetStravaActivities($access_token: String!) {
    strava {
      listActivities(access_token: $access_token)
    }
  }
`;

let Sync = () => {
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
        <Button onClick={fetchLatest}>Fetch</Button>
      </div>
    </React.Fragment>
  );
};

Sync = CSSModules(Sync, styles);

export default Sync;
