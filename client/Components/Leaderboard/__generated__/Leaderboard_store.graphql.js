/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Leaderboard_store = {|
  +id: string;
  +current: ?$ReadOnlyArray<?{| |}>;
  +last: ?$ReadOnlyArray<?{| |}>;
  +currentSeason: ?{| |};
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
    },
    {
      "kind": "LocalArgument",
      "name": "currentWeekNo",
      "type": "Int",
      "defaultValue": 44
    },
    {
      "kind": "LocalArgument",
      "name": "currentWeekYear",
      "type": "Int",
      "defaultValue": 2017
    },
    {
      "kind": "LocalArgument",
      "name": "lastWeekNo",
      "type": "Int",
      "defaultValue": 43
    },
    {
      "kind": "LocalArgument",
      "name": "lastWeekYear",
      "type": "Int",
      "defaultValue": 2017
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Leaderboard_store",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Medals_store",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Catchup_store",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": "current",
      "args": [
        {
          "kind": "Variable",
          "name": "week",
          "variableName": "currentWeekNo",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "year",
          "variableName": "currentWeekYear",
          "type": "Int"
        }
      ],
      "concreteType": "Summary",
      "name": "summary",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "LeaderboardList_summary",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "last",
      "args": [
        {
          "kind": "Variable",
          "name": "week",
          "variableName": "lastWeekNo",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "year",
          "variableName": "lastWeekYear",
          "type": "Int"
        }
      ],
      "concreteType": "Summary",
      "name": "summary",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "LeaderboardList_summary",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Season",
      "name": "currentSeason",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Medals_season",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Store"
};

module.exports = fragment;
