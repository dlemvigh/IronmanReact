/**
 * @flow
 * @relayHash b69d216483bf2ceeaf87f2043e32fbf6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type EnsureLoginMutationVariables = {|
  input: {
    username: string;
    provider: string;
    providerUserId: string;
    clientMutationId?: ?string;
  };
|};
export type EnsureLoginMutationResponse = {|
  +ensureLogin: ?{|
    +user: ?{|
      +id: string;
      +username: ?string;
    |};
  |};
|};
*/


/*
mutation EnsureLoginMutation(
  $input: EnsureLoginInput!
) {
  ensureLogin(input: $input) {
    user {
      id
      username
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
        "type": "EnsureLoginInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EnsureLoginMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "EnsureLoginInput!"
          }
        ],
        "concreteType": "EnsureLoginPayload",
        "name": "ensureLogin",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
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
                "name": "username",
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
  "name": "EnsureLoginMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "EnsureLoginInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "EnsureLoginMutation",
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
            "type": "EnsureLoginInput!"
          }
        ],
        "concreteType": "EnsureLoginPayload",
        "name": "ensureLogin",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
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
                "name": "username",
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
  "text": "mutation EnsureLoginMutation(\n  $input: EnsureLoginInput!\n) {\n  ensureLogin(input: $input) {\n    user {\n      id\n      username\n    }\n  }\n}\n"
};

module.exports = batch;
