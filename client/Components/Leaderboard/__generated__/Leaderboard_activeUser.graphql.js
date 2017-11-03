/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Leaderboard_activeUser = {| |};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Leaderboard_activeUser",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PersonalGoals_user",
      "args": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
