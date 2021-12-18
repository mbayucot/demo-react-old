import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { GET_ALL_POSTS } from '@demo/shared';

import NavBar from './NavBar';
import PostCard from './PostCard';

const HomePage: FC = () => {
  const [query, setQuery] = React.useState('');

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: { query },
  });

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <NavBar onSearch={handleSearch} />
      <Box>
        {loading ? <CircularProgress /> : data && data.posts.collection.map((row: any) => <PostCard {...row} />)}
        {error && <Alert severity="error">${error.message}</Alert>}
      </Box>
    </Container>
  );
};

export default HomePage;
