import React, { FC, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts($page: Int, $query: String!, $sort: String!) {
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

const PostListPage: FC = () => {
  const [page, setPage] = useState(0);
  const [query, setSearchText] = React.useState('');

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { page, query },
  });

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
      <div style={{ height: 300, width: '100%' }}></div>
    </>
  );
};

export default PostListPage;
