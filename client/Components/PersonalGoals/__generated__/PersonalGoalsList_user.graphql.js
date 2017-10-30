/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type PersonalGoalsList_user = {|
  +activities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +week: ?number;
        +year: ?number;
      |};
    |}>;
  |};
  +personalGoals: ?$ReadOnlyArray<?{|
    +_id: string;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PersonalGoalsList_user",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PersonalGoalsItem_user",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1000,
          "type": "Int"
        }
      ],
      "concreteType": "ActivityConnection",
      "name": "activities",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "ActivityEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "PersonalGoalsItem_activities",
              "args": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Activity",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "week",
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "year",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "activities{\"first\":1000}"
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
          "kind": "FragmentSpread",
          "name": "PersonalGoalsItem_goal",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
