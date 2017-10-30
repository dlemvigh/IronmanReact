/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ControlDiscipline_store = {|
  +disciplines: ?$ReadOnlyArray<?{|
    +_id: string;
    +name: ?string;
    +unit: ?string;
    +score: ?number;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ControlDiscipline_store",
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
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "unit",
          "storageKey": null
        },
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
  "type": "Store"
};

module.exports = fragment;
