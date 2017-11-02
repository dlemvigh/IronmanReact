/**
 * @flow
 * @relayHash 67b8f1e33ec1877221785cd9ead54edb
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AppQueryResponse = {|
  +user?: ?{| |};
  +store: ?{| |};
|};
*/


/*
query AppQuery(
  $activeUser: String!
  $hasActiveUser: Boolean!
) {
  user(username: $activeUser) @include(if: $hasActiveUser) {
    ...App_activeUser
    id
  }
  store {
    ...App_store
    id
  }
}

fragment App_activeUser on User {
  ...Header_activeUser
}

fragment App_store on Store {
  id
  ...Header_store
}

fragment Header_store on Store {
  users {
    name
    username
    id
  }
  allSeasons {
    _id
    name
    from
    id
  }
}

fragment Header_activeUser on User {
  username
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "activeUser",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "hasActiveUser",
        "type": "Boolean!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Store",
        "name": "store",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "App_store",
            "args": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "hasActiveUser",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "username",
                "variableName": "activeUser",
                "type": "String"
              }
            ],
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "App_activeUser",
                "args": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AppQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "activeUser",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "hasActiveUser",
        "type": "Boolean!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AppQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Store",
        "name": "store",
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
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "users",
            "plural": true,
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Season",
            "name": "allSeasons",
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
                "name": "from",
                "storageKey": null
              },
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
        "kind": "Condition",
        "passingValue": true,
        "condition": "hasActiveUser",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "username",
                "variableName": "activeUser",
                "type": "String"
              }
            ],
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "username",
                "storageKey": null
              },
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
        ]
      }
    ]
  },
  "text": "query AppQuery(\n  $activeUser: String!\n  $hasActiveUser: Boolean!\n) {\n  user(username: $activeUser) @include(if: $hasActiveUser) {\n    ...App_activeUser\n    id\n  }\n  store {\n    ...App_store\n    id\n  }\n}\n\nfragment App_activeUser on User {\n  ...Header_activeUser\n}\n\nfragment App_store on Store {\n  id\n  ...Header_store\n}\n\nfragment Header_store on Store {\n  users {\n    name\n    username\n    id\n  }\n  allSeasons {\n    _id\n    name\n    from\n    id\n  }\n}\n\nfragment Header_activeUser on User {\n  username\n}\n"
};

module.exports = batch;
