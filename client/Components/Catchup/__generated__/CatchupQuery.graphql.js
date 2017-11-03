/**
 * @flow
 * @relayHash 6f7a4da7097e164056d0b39406b13d96
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CatchupQueryResponse = {|
  +store: ?{| |};
|};
*/


/*
query CatchupQuery(
  $week: Int
  $year: Int
) {
  store {
    ...Catchup_store_3L7R8V
    id
  }
}

fragment Catchup_store_3L7R8V on Store {
  users {
    name
    summary(week: $week, year: $year) {
      score
      id
    }
    id
  }
  ...CatchupList_store
}

fragment CatchupList_store on Store {
  disciplines {
    _id
    name
    ...CatchupItem_disciplines
    id
  }
  users {
    _id
    ...CatchupItem_user
    summary(week: $week, year: $year) {
      score
      ...CatchupItem_summary
      id
    }
    id
  }
}

fragment CatchupItem_disciplines on Discipline {
  _id
  name
  score
  unit
}

fragment CatchupItem_user on User {
  name
  username
}

fragment CatchupItem_summary on Summary {
  score
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "week",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "year",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CatchupQuery",
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
            "name": "Catchup_store",
            "args": [
              {
                "kind": "Variable",
                "name": "week",
                "variableName": "week",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "year",
                "variableName": "year",
                "type": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CatchupQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "week",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "year",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CatchupQuery",
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
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "week",
                    "variableName": "week",
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "year",
                    "variableName": "year",
                    "type": "Int"
                  }
                ],
                "concreteType": "Summary",
                "name": "summary",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "score",
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
                "kind": "InlineFragment",
                "type": "User",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "username",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": null
          },
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
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "Discipline",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "score",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "unit",
                    "storageKey": null
                  }
                ]
              }
            ],
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
  },
  "text": "query CatchupQuery(\n  $week: Int\n  $year: Int\n) {\n  store {\n    ...Catchup_store_3L7R8V\n    id\n  }\n}\n\nfragment Catchup_store_3L7R8V on Store {\n  users {\n    name\n    summary(week: $week, year: $year) {\n      score\n      id\n    }\n    id\n  }\n  ...CatchupList_store\n}\n\nfragment CatchupList_store on Store {\n  disciplines {\n    _id\n    name\n    ...CatchupItem_disciplines\n    id\n  }\n  users {\n    _id\n    ...CatchupItem_user\n    summary(week: $week, year: $year) {\n      score\n      ...CatchupItem_summary\n      id\n    }\n    id\n  }\n}\n\nfragment CatchupItem_disciplines on Discipline {\n  _id\n  name\n  score\n  unit\n}\n\nfragment CatchupItem_user on User {\n  name\n  username\n}\n\nfragment CatchupItem_summary on Summary {\n  score\n}\n"
};

module.exports = batch;
