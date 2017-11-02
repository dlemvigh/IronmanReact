/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ActivityList_user = {|
  +activities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +week: ?number;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityList_user",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ActivityItem_user",
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "week",
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ActivityItem_activity",
                  "args": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "activities{\"first\":1000}"
    }
  ],
  "type": "User"
};

module.exports = fragment;
