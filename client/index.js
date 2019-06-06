import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/browser";

import { client } from "./apolloClient";
import AppQueries from "./Components/App/AppQueries";

Sentry.init({
  dsn: "https://8676b823da2a4ac49e0e0c70e6cc03cd@sentry.io/1457481",
  environment: process.env.NODE_ENV
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppQueries />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("app")
);
