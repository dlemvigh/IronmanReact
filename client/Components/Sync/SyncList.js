import React from "react";
import { Table } from "react-bootstrap";
import gql from "graphql-tag";

import SyncItem from "./SyncItem";

const SyncList = ({ syncLog }) => (
  <Table>
    <thead>
      <tr>
        {/* <th>Id</th> */}
        {/* <th>Name</th> */}
        {/* <th>Type</th> */}
        <th>Discipline</th>
        <th>Distance</th>
        <th>Score</th>
        {/* <th>Duration</th> */}
        <th>Date</th>
        <th>Status</th>
        {/* <th>Distance</th> */}
        <th />
      </tr>
    </thead>
    <tbody>
      {syncLog.map(syncLog => (
        <SyncItem key={syncLog.id} syncLog={syncLog} />
      ))}
    </tbody>
  </Table>
);

SyncList.fragments = {
  syncLog: gql`
    fragment SyncList_syncLog on SyncLog {
      id
      ...SyncItem_syncLog
    }
    ${SyncItem.fragments.syncLog}
  `
};

export default SyncList;
