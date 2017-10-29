import React from "react";
import { makeRouteConfig, Route } from "found";

import PageA from "./PageA";
import PageB from "./PageB";
import PageC from "./PageC";
import queryC from "./queryC";

export default makeRouteConfig(
  <Route
    path="/"
  >
    <Route
      path="a"
      Component={PageA}
    />
    <Route
      path="b"
      Component={PageB}
    />
    <Route
      path="c"
      Component={PageC}
      queries={queryC}
    />
  </Route>
);
