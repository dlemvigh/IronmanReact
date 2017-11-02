/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type PersonalGoalsForm_user = {|
  +id: string;
  +_id: string;
  +personalGoals: ?$ReadOnlyArray<?{|
    +_id: string;
    +disciplineId: ?string;
    +disciplineName: ?string;
    +dist: ?number;
    +count: ?number;
    +score: ?number;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PersonalGoalsForm_user",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PersonalGoals_user",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
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
      "concreteType": "PersonalGoal",
      "name": "personalGoals",
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
          "name": "disciplineId",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "disciplineName",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "dist",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "count",
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
  "type": "User"
};

module.exports = fragment;
