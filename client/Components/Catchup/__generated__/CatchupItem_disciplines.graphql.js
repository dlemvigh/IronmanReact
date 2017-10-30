/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type CatchupItem_disciplines = $ReadOnlyArray<{|
  +_id: string;
  +name: ?string;
  +score: ?number;
  +unit: ?string;
|}>;
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CatchupItem_disciplines",
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
      "name": "name",
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
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "unit",
      "storageKey": null
    }
  ],
  "type": "Discipline"
};

module.exports = fragment;
