/**
 * @flow
 * @relayHash e839d6f208ae190c3ec025d86e9f2120
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ActivityQueryResponse = {|
  +store: ?{| |};
  +user: ?{| |};
|};
*/


/*
query ActivityQuery(
  $username: String!
) {
  store {
    ...Activity_store
    id
  }
  user(username: $username) {
    ...Activity_user
    id
  }
}

fragment Activity_store on Store {
  ...ActivityForm_store
  ...ActivityList_store
}

fragment Activity_user on User {
  name
  username
  ...ActivityForm_user
  ...ActivityList_user
  ...PersonalGoals_user
}

fragment ActivityForm_user on User {
  _id
  id
}

fragment ActivityList_user on User {
  ...ActivityItem_user
  activities(first: 1000) {
    edges {
      node {
        id
        week
        ...ActivityItem_activity
      }
    }
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

fragment ActivityItem_user on User {
  id
}

fragment ActivityItem_activity on Activity {
  _id
  id
  disciplineId
  disciplineName
  distance
  unit
  score
  date
}

fragment ActivityForm_store on Store {
  id
  users {
    medals {
      id
    }
    id
  }
  disciplines {
    _id
    name
    id
  }
  ...ControlDiscipline_store
}

fragment ActivityList_store on Store {
  ...ActivityItem_store
}

fragment ActivityItem_store on Store {
  id
  users {
    medals {
      id
    }
    id
  }
}

fragment ControlDiscipline_store on Store {
  disciplines {
    _id
    name
    unit
    score
    id
  }
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
    "name": "ActivityQuery",
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
            "name": "Activity_store",
            "args": null
          }
        ],
        "storageKey": null
      },
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
            "name": "Activity_user",
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
  "name": "ActivityQuery",
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
    "name": "ActivityQuery",
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
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Medals",
                "name": "medals",
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
                "name": "score",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
                        "name": "unit",
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
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "year",
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
          },
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query ActivityQuery(\n  $username: String!\n) {\n  store {\n    ...Activity_store\n    id\n  }\n  user(username: $username) {\n    ...Activity_user\n    id\n  }\n}\n\nfragment Activity_store on Store {\n  ...ActivityForm_store\n  ...ActivityList_store\n}\n\nfragment Activity_user on User {\n  name\n  username\n  ...ActivityForm_user\n  ...ActivityList_user\n  ...PersonalGoals_user\n}\n\nfragment ActivityForm_user on User {\n  _id\n  id\n}\n\nfragment ActivityList_user on User {\n  ...ActivityItem_user\n  activities(first: 1000) {\n    edges {\n      node {\n        id\n        week\n        ...ActivityItem_activity\n      }\n    }\n  }\n}\n\nfragment PersonalGoals_user on User {\n  personalGoals {\n    _id\n    id\n  }\n  ...PersonalGoalsList_user\n}\n\nfragment PersonalGoalsList_user on User {\n  ...PersonalGoalsItem_user\n  activities(first: 1000) {\n    edges {\n      ...PersonalGoalsItem_activities\n      node {\n        week\n        year\n        id\n      }\n    }\n  }\n  personalGoals {\n    _id\n    ...PersonalGoalsItem_goal\n    id\n  }\n}\n\nfragment PersonalGoalsItem_user on User {\n  username\n}\n\nfragment PersonalGoalsItem_activities on ActivityEdge {\n  node {\n    disciplineId\n    disciplineName\n    distance\n    score\n    id\n  }\n}\n\nfragment PersonalGoalsItem_goal on PersonalGoal {\n  disciplineId\n  discipline {\n    name\n    unit\n    id\n  }\n  count\n  dist\n  score\n}\n\nfragment ActivityItem_user on User {\n  id\n}\n\nfragment ActivityItem_activity on Activity {\n  _id\n  id\n  disciplineId\n  disciplineName\n  distance\n  unit\n  score\n  date\n}\n\nfragment ActivityForm_store on Store {\n  id\n  users {\n    medals {\n      id\n    }\n    id\n  }\n  disciplines {\n    _id\n    name\n    id\n  }\n  ...ControlDiscipline_store\n}\n\nfragment ActivityList_store on Store {\n  ...ActivityItem_store\n}\n\nfragment ActivityItem_store on Store {\n  id\n  users {\n    medals {\n      id\n    }\n    id\n  }\n}\n\nfragment ControlDiscipline_store on Store {\n  disciplines {\n    _id\n    name\n    unit\n    score\n    id\n  }\n}\n"
};

module.exports = batch;
