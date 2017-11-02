/**
 * @flow
 * @relayHash 272bd9b75c155dca857cfc2fcb1b31ae
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type GraphsQueryResponse = {|
  +store: ?{| |};
|};
*/


/*
query GraphsQuery {
  store {
    ...Graphs_store
    id
  }
}

fragment Graphs_store on Store {
  ...WeeklyTotal_store
  ...Weekday_store
  users {
    name
    id
  }
  allSummaries {
    userName
    year
    week
    score
    id
  }
}

fragment WeeklyTotal_store on Store {
  users {
    name
    id
  }
  allSummaries {
    userName
    year
    week
    score
    id
  }
}

fragment Weekday_store on Store {
  users {
    name
    activities(first: 1000) {
      edges {
        node {
          date
          score
          disciplineId
          disciplineName
          id
        }
      }
    }
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GraphsQuery",
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
            "name": "Graphs_store",
            "args": null
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
  "name": "GraphsQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "GraphsQuery",
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
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
                            "name": "date",
                            "storageKey": null
                          },
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
                "storageKey": "activities{\"first\":1000}"
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Summary",
            "name": "allSummaries",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "userName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "year",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query GraphsQuery {\n  store {\n    ...Graphs_store\n    id\n  }\n}\n\nfragment Graphs_store on Store {\n  ...WeeklyTotal_store\n  ...Weekday_store\n  users {\n    name\n    id\n  }\n  allSummaries {\n    userName\n    year\n    week\n    score\n    id\n  }\n}\n\nfragment WeeklyTotal_store on Store {\n  users {\n    name\n    id\n  }\n  allSummaries {\n    userName\n    year\n    week\n    score\n    id\n  }\n}\n\nfragment Weekday_store on Store {\n  users {\n    name\n    activities(first: 1000) {\n      edges {\n        node {\n          date\n          score\n          disciplineId\n          disciplineName\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
