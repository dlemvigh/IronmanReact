import React from "react";
import { render } from "react-dom";
import history from "./history";
import Routes from "./routes";

import { getConfig } from "../shared/config";

const config = getConfig();
const endpoint = `http://localhost:${config.port}/graphql`;

render(<Routes history={history} />, document.getElementById("app"));
