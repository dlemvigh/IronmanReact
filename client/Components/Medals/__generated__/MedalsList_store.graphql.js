/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type MedalsList_store = {|
  +users: ?$ReadOnlyArray<?{|
    +_id: string;
    +medals: ?{|
      +goldWeeks: ?$ReadOnlyArray<?number>;
      +silverWeeks: ?$ReadOnlyArray<?number>;
      +bronzeWeeks: ?$ReadOnlyArray<?number>;
    |};
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MedalsList_store",
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
          "name": "_id",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "Medals",
          "name": "medals",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "goldWeeks",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "silverWeeks",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "bronzeWeeks",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "MedalsItem_user",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
