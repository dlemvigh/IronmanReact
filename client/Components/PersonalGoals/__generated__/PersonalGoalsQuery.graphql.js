/**
 * @flow
 * @relayHash ec41dc1e40cf153bde2abdccdfb9ddb3
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type PersonalGoalsQueryResponse = {|
  +user: ?{| |};
|};
*/


/*
query PersonalGoalsQuery(
  $username: String!
) {
  user(username: $username) {
    ...PersonalGoals_user
    id
  }
}

fragment PersonalGoals_user on User {
  personalGoals {
    _id
    id
  }
  ...PersonalGoalsList_user
}

fragment PersonalGoalsList_user on User {
  ...PersonalGoalsItem_user
  activities(first: 1000) {
    edges {
      ...PersonalGoalsItem_activities
      node {
        week
        year
        id
      }
    }
  }
  personalGoals {
    _id
    ...PersonalGoalsItem_goal
    id
  }
}

fragment PersonalGoalsItem_user on User {
  username
}

fragment PersonalGoalsItem_activities on ActivityEdge {
  node {
    disciplineId
    disciplineName
    distance
    score
    id
  }
}

fragment PersonalGoalsItem_goal on PersonalGoal {
  disciplineId
  discipline {
    name
    unit
    id
  }
  count
  dist
  score
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "username",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonalGoalsQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username",
            "type": "String"
          }
        ],
        "concreteType": "User",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "PersonalGoals_user",
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
  "name": "PersonalGoalsQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "username",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "PersonalGoalsQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username",
            "type": "String"
          }
        ],
        "concreteType": "User",
        "name": "user",
        "plural": false,
        "selections": [
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "PersonalGoal",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "disciplineId",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Discipline",
                    "name": "discipline",
                    "plural": false,
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
                        "name": "unit",
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
                    "name": "count",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "dist",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "score",
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
            "name": "username",
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
                        "name": "week",
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
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "ActivityEdge",
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
                            "name": "distance",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "score",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "activities{\"first\":1000}"
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
  "text": "query PersonalGoalsQuery(\n  $username: String!\n) {\n  user(username: $username) {\n    ...PersonalGoals_user\n    id\n  }\n}\n\nfragment PersonalGoals_user on User {\n  personalGoals {\n    _id\n    id\n  }\n  ...PersonalGoalsList_user\n}\n\nfragment PersonalGoalsList_user on User {\n  ...PersonalGoalsItem_user\n  activities(first: 1000) {\n    edges {\n      ...PersonalGoalsItem_activities\n      node {\n        week\n        year\n        id\n      }\n    }\n  }\n  personalGoals {\n    _id\n    ...PersonalGoalsItem_goal\n    id\n  }\n}\n\nfragment PersonalGoalsItem_user on User {\n  username\n}\n\nfragment PersonalGoalsItem_activities on ActivityEdge {\n  node {\n    disciplineId\n    disciplineName\n    distance\n    score\n    id\n  }\n}\n\nfragment PersonalGoalsItem_goal on PersonalGoal {\n  disciplineId\n  discipline {\n    name\n    unit\n    id\n  }\n  count\n  dist\n  score\n}\n"
};

module.exports = batch;
