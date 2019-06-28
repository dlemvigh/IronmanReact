import { useContext } from "react";
import { __RouterContext } from "react-router";
import useLocalStorage from "react-use/lib/useLocalStorage";
import queryString from "query-string";
import gql from "graphql-tag";

import { client } from "../../apolloClient";

const GET_TOKEN = gql`
  query GetToken($code: String!) {
    strava {
      access_token: getToken(code: $code)
    }
  }
`;

const useStravaAccessToken = () => {
  const { history, match } = useContext(__RouterContext);
  const [accessToken, setAccessToken] = useLocalStorage("access_token");

  const parsed = queryString.parse(location.search);
  const { code } = parsed;
  if (code) {
    client
      .query({
        query: GET_TOKEN,
        variables: { code }
      })
      .then(({ data }) => {
        const { access_token } = data.strava;
        setAccessToken(access_token);
        history.push(match.path);
      });
  }

  if (accessToken) {
    return accessToken;
  }
};

export default useStravaAccessToken;
