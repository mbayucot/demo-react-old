import React, { FC } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import NavBar from './NavBar';
import PostCard from './PostCard';
import CommentListItem from '../../blog/comment/CommentListItem';

const GET_POSTS = gql`
  query GetPosts($page: Int, $query: String!) {
    posts(page: $page, query: $query) {
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

const HomePage: FC = () => {
  const [query, setSearchText] = React.useState('');

  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { query },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <NavBar />
      <div>
        {data.posts.collection.map((row: any) => (
          <PostCard {...row} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
