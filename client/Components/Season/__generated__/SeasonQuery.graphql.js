/**
 * @flow
 * @relayHash d6db6dd35291ee745b2da171064a599d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SeasonQueryResponse = {|
  +store: ?{| |};
  +season: ?{| |};
|};
*/


/*
query SeasonQuery(
  $id: String!
) {
  store {
    ...Season_store
    id
  }
  season(id: $id) {
    ...Season_season
    id
  }
}

fragment Season_store on Store {
  ...Medals_store
}

fragment Season_season on Season {
  name
  ...Medals_season
}

fragment Medals_season on Season {
  ...MedalsList_season
  ...SeasonTitle_season
}

fragment MedalsList_season on Season {
  from
  to
}

fragment SeasonTitle_season on Season {
  name
  from
  to
}

fragment Medals_store on Store {
  ...MedalsList_store
}

fragment MedalsList_store on Store {
  users {
    _id
    medals {
      goldWeeks
      silverWeeks
      bronzeWeeks
      id
    }
    ...MedalsItem_user
    id
  }
}

fragment MedalsItem_user on User {
  username
  name
  medals {
    goldWeeks
    silverWeeks
    bronzeWeeks
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SeasonQuery",
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
            "name": "Season_store",
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
            "name": "id",
            "variableName": "id",
            "type": "String"
          }
        ],
        "concreteType": "Season",
        "name": "season",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Season_season",
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
  "name": "SeasonQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "SeasonQuery",
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
                "name": "_id",
                "storageKey": null
              },
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
                    "name": "goldWeeks",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "silverWeeks",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "bronzeWeeks",
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
                "kind": "InlineFragment",
                "type": "User",
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
                    "name": "name",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "String"
          }
        ],
        "concreteType": "Season",
        "name": "season",
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
            "name": "from",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "to",
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
  "text": "query SeasonQuery(\n  $id: String!\n) {\n  store {\n    ...Season_store\n    id\n  }\n  season(id: $id) {\n    ...Season_season\n    id\n  }\n}\n\nfragment Season_store on Store {\n  ...Medals_store\n}\n\nfragment Season_season on Season {\n  name\n  ...Medals_season\n}\n\nfragment Medals_season on Season {\n  ...MedalsList_season\n  ...SeasonTitle_season\n}\n\nfragment MedalsList_season on Season {\n  from\n  to\n}\n\nfragment SeasonTitle_season on Season {\n  name\n  from\n  to\n}\n\nfragment Medals_store on Store {\n  ...MedalsList_store\n}\n\nfragment MedalsList_store on Store {\n  users {\n    _id\n    medals {\n      goldWeeks\n      silverWeeks\n      bronzeWeeks\n      id\n    }\n    ...MedalsItem_user\n    id\n  }\n}\n\nfragment MedalsItem_user on User {\n  username\n  name\n  medals {\n    goldWeeks\n    silverWeeks\n    bronzeWeeks\n    id\n  }\n}\n"
};

module.exports = batch;
