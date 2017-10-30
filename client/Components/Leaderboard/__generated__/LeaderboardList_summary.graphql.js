/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type LeaderboardList_summary = $ReadOnlyArray<{|
  +_id: string;
  +score: ?number;
|}>;
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "LeaderboardList_summary",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "_id",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "score",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "LeaderboardItem_summary",
      "args": null
    }
  ],
  "type": "Summary"
};

module.exports = fragment;
