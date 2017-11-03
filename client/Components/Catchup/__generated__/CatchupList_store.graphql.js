/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type CatchupList_store = {|
  +disciplines: ?$ReadOnlyArray<?{|
    +_id: string;
    +name: ?string;
  |}>;
  +users: ?$ReadOnlyArray<?{|
    +_id: string;
    +summary: ?{|
      +score: ?number;
    |};
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "week",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "year",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CatchupList_store",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Discipline",
      "name": "disciplines",
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
          "kind": "FragmentSpread",
          "name": "CatchupItem_disciplines",
          "args": null
        }
      ],
      "storageKey": null
    },
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
          "name": "_id",
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "CatchupItem_user",
          "args": null
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
            },
            {
              "kind": "FragmentSpread",
              "name": "CatchupItem_summary",
              "args": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
