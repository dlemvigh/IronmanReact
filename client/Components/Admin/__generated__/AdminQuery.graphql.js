/**
 * @flow
 * @relayHash 210c67b18bb6b1d1804f5e77c38e7490
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AdminQueryResponse = {|
  +store: ?{| |};
|};
*/


/*
query AdminQuery {
  store {
    ...Admin_store
    id
  }
}

fragment Admin_store on Store {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Store",
        "name": "store",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Admin_store",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AdminQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "AdminQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Store",
        "name": "store",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query AdminQuery {\n  store {\n    ...Admin_store\n    id\n  }\n}\n\nfragment Admin_store on Store {\n  id\n}\n"
};

module.exports = batch;
