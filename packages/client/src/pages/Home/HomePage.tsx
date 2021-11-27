import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from '@demo/shared';

import NavBar from './NavBar';
import PostCard from './PostCard';

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
