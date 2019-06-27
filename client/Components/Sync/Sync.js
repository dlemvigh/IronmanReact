import React from "react";
import { client } from "../../apolloClient";
import gql from "graphql-tag";

const GET_TOKEN = gql`
  query GetToken($code: String!) {
    strava {
      access_token: getToken(code: $code)
    }
  }
`;

const GET_ACTIVITIES = gql`
  query GetStravaActivities($token: String!) {
    strava {
      listActivities(access_token: $token) 
    }
  }
`;

const Sync = () => {
  const [token, setToken] = React.useState(sessionStorage.getItem("access_token"));
  const [data, setData] = React.useState("");
  React.useEffect(() => {
    client.query({
      query: GET_TOKEN,
      variables: {
        code: "" // get from query params
      }
    }).then(({ data }) => {      
      const { access_token } = data.strava;
      sessionStorage.setItem("access_token", access_token);
      setToken(access_token);
    });
  });

  React.useEffect(() => {
    client.query({
      query: GET_ACTIVITIES,
      variables: { token }
    }).then(({ data }) => {
      console.log("activity data", data);
      setData(data.strava.listActivities);
    });
  }, [token]);

  return (
    <React.Fragment>
      <h3>Strava sync</h3>
      <pre>{data}</pre>
    </React.Fragment>
)
};

export default Sync;