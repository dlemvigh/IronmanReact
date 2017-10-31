/**
 * @flow
 * @relayHash cc2b5ff0dc4b9bd370f4f837ae79699b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AddSeasonMutationVariables = {|
  input: {
    name: string;
    url: string;
    from: number;
    to: number;
    clientMutationId?: ?string;
  };
|};
export type AddSeasonMutationResponse = {|
  +addSeason: ?{|
    +season: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation AddSeasonMutation(
  $input: AddSeasonInput!
) {
  addSeason(input: $input) {
    season {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddSeasonInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddSeasonMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddSeasonInput!"
          }
        ],
        "concreteType": "AddSeasonPayload",
        "name": "addSeason",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Season",
            "name": "season",
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
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AddSeasonMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "AddSeasonInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AddSeasonMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "AddSeasonInput!"
          }
        ],
        "concreteType": "AddSeasonPayload",
        "name": "addSeason",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Season",
            "name": "season",
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
      }
    ]
  },
  "text": "mutation AddSeasonMutation(\n  $input: AddSeasonInput!\n) {\n  addSeason(input: $input) {\n    season {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
