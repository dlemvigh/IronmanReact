import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import { client } from "./apolloClient";
import AppQueries from "./Components/App/AppQueries";

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppQueries />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("app")
);
