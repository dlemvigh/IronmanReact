import React from "react";
import CSSModules from "react-css-modules";
import gql from "graphql-tag";

import Date from "../Common/Date";
import Discipline from "../Common/Discipline";
import Score from "../Common/Score";
import Icon from "../Common/Icon";

import styles from "./SyncItem.modules.scss";

const SyncItem = ({ syncLog }) => {
  const { activity } = syncLog;
  const [expanded, setExpanded] = React.useState(true);
  return (
    <React.Fragment>
      <tr>
        {/* <td>{syncLog.id}</td>
        <td>{syncLog.name}</td>
        <td>{syncLog.type}</td>
        <td>{syncLog.distance}</td>
        <td>{syncLog.moving_time}</td> */}
        <td>
          <Discipline value={activity.disciplineName} />
        </td>
        <td>
          {activity.distance} {activity.unit}
        </td>
        <td>
          <Score value={activity.score} />
        </td>
        <td>
          <Date value={syncLog.start_date_local} />
        </td>
        <td>{syncLog.status}</td>
        <td>
          <button type="button">add</button>
          <button type="button">delete</button>
          <button type="button" onClick={() => setExpanded(!expanded)}>
            advanced
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={10}>
            <dl
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridAutoFlow: "column"
              }}
            >
              <dt>Id</dt>
              <dd>{syncLog.id}</dd>
              <dt>Name</dt>
              <dd>{syncLog.name}</dd>
              <dt>Type</dt>
              <dd>{syncLog.type}</dd>
              <dt>Distance</dt>
              <dd>{syncLog.distance}</dd>
              <dt>Moving time</dt>
              <dd>{syncLog.moving_time}</dd>
            </dl>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

SyncItem.fragments = {
  syncLog: gql`
    fragment SyncItem_syncLog on SyncLog {
      id
      status
      name
      type
      distance
      moving_time
      start_date_local
      activity {
        id
        disciplineName
        distance
        unit
        score
        weekyear
      }
    }
  `
};

export default CSSModules(SyncItem, styles);
