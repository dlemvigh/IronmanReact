/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Activity_user = {|
  +name: ?string;
  +username: ?string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Activity_user",
  "selections": [
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
      "name": "username",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ActivityForm_user",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ActivityList_user",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PersonalGoals_user",
      "args": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
