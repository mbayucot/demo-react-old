import { gql } from '@apollo/client';

export const REACT_POST = gql`
  mutation reactPost($id: ID!, $weight: Int!) {
    reactPost(id: $id, weight: $weight) {
      post {
        id
        title
      }
    }
  }
`;
