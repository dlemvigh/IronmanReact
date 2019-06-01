import gql from "graphql-tag";

export const ActivityFragment = gql`
  fragment ActivityFragment on Activity {
    _id
    id
    date
    disciplineId
    disciplineName
    distance        
    score
    unit
    week
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
