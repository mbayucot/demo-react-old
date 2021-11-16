import React, { FC } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import NavBar from './NavBar';
import PostCard from './PostCard';
import { GET_ALL_POSTS } from '../../operations/queries/getAllPosts';

const HomePage: FC = () => {
  const [query, setSearchText] = React.useState('');

  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS, {
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
