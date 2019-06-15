import gql from "graphql-tag";

export const ActivityFragment = gql`
  fragment ActivityFragment on Activity {
    id
    _id
    date
    disciplineId
    disciplineName
    distance
    score
    unit
    week
    year
  }
`;

export const ActivityEdgeFragment = gql`
  fragment ActivityEdgeFragment on ActivityEdge {
    node {
      ...ActivityFragment
    }
  }
  ${ActivityFragment}
`;

export const SummaryFragment = gql`
  fragment SummaryFragment on Summary {
    id
    score
    user {
      id
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query GetActivities($username: String!) {
    user(username: $username) {
      id
      activities {
        edges {
          ...ActivityEdgeFragment
        }
      }
    }
  }
  ${ActivityEdgeFragment}
`;

export const GET_SUMMARIES = gql`
  query GetSummaries($week: Int!, $year: Int!) {
    store {
      id
      summary(week: $week, year: $year) {
        ...SummaryFragment
      }
    }
  }
  ${SummaryFragment}
`;

export const GET_STORE = gql`
  query GetStore {
    store {
      id
    }
  }
`;

export const updateSummary = (cache, summary, week, year) => {
  let store;
  const variables = { week, year };

  try {
    const data = cache.readQuery({
      query: GET_SUMMARIES,
      variables
    });
    store = data.store;
  } catch {
    const data = cache.readQuery({
      query: GET_STORE
    });
    store = data.store;
  }

  store.summary = summary;
  cache.writeQuery({
    query: GET_SUMMARIES,
    variables,
    data: { store }
  });
};
