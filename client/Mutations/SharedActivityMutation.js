import gql from "graphql-tag";

export const ActivityEdgeFragment = gql`
  fragment ActivityEdgeFragment on ActivityEdge {
    node {
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
  }
`;

export const GET_ACTIVITIES = gql`
  query GetActivities($username: String!) {
    user(username: $username) {
      id
      activities(first: 100) {
        edges {
          ...ActivityEdgeFragment
        }
      }      
    }
  }
  ${ActivityEdgeFragment}
`;
