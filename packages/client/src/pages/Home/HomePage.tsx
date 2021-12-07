import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { GET_ALL_POSTS } from '@demo/shared';

import NavBar from './NavBar';
import PostCard from './PostCard';

const HomePage: FC = () => {
  const [query, setSearchText] = React.useState('');

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: { query },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">${error.message}</Alert>;

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
