import React from "react";
import gql from "graphql-tag";

import Date from "../Common/Date";

const SyncItem = ({ syncLog }) => {
  return (
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
    </tr>
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
    }
  `
};

export default SyncItem;
