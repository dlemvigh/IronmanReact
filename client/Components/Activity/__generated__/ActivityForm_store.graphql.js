/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ActivityForm_store = {|
  +id: string;
  +users: ?$ReadOnlyArray<?{|
    +medals: ?{|
      +id: string;
    |};
  |}>;
  +disciplines: ?$ReadOnlyArray<?{|
    +_id: string;
    +name: ?string;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityForm_store",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
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
              "name": "id",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
        }
      ],
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ControlDiscipline_store",
      "args": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
