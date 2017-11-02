/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Header_store = {|
  +users: ?$ReadOnlyArray<?{|
    +name: ?string;
    +username: ?string;
  |}>;
  +allSeasons: ?$ReadOnlyArray<?{|
    +_id: string;
    +name: ?string;
    +from: ?number;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_store",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "users",
      "plural": true,
      "selections": [
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
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Season",
      "name": "allSeasons",
      "plural": true,
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
          "name": "from",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
