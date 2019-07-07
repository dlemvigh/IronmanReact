import React from "react";
import gql from "graphql-tag";

import Date from "../Common/Date";
import Discipline from "../Common/Discipline";
import Score from "../Common/Score";

const SyncItem = ({ syncLog }) => {
  const { activity } = syncLog;

  return (
    <React.Fragment>
      <tr>
        <td>{syncLog.status}</td>
        <td>{syncLog.id}</td>
        <td>{syncLog.name}</td>
        <td>{syncLog.type}</td>
        <td>{syncLog.distance}</td>
        <td>{syncLog.moving_time}</td>
        <td>
          <Date value={syncLog.start_date_local} />
        </td>
        <td>
          <Discipline value={activity.disciplineName} />
        </td>
        <td>
          {activity.distance} {activity.unit}
        </td>
        <td>
          <Score value={activity.score} />
        </td>
      </tr>
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

export default SyncItem;
