/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Catchup_store = {|
  +users: ?$ReadOnlyArray<?{|
    +name: ?string;
    +summary: ?{|
      +score: ?number;
    |};
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "week",
      "type": "Int",
      "defaultValue": 44
    },
    {
      "kind": "LocalArgument",
      "name": "year",
      "type": "Int",
      "defaultValue": 2017
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Catchup_store",
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
          "kind": "LinkedField",
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "week",
              "variableName": "week",
              "type": "Int"
            },
            {
              "kind": "Variable",
              "name": "year",
              "variableName": "year",
              "type": "Int"
            }
          ],
          "concreteType": "Summary",
          "name": "summary",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "score",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CatchupList_store",
      "args": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
