import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts($page: Int, $query: String!, $sort: String!) {
    posts(page: $page, query: $query, sort: $sort) {
      collection {
        id
        title
        body
        slug
        updatedAt
        user {
          id
          firstName
          lastName
        }
      }
      metadata {
        totalPages
        totalCount
        currentPage
        limitValue
      }
    }
  }
`;
