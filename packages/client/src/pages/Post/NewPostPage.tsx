import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_ALL_POSTS } from '@demo/shared';

import PostForm, { FormValues, validationSchema } from './PostForm';

const NewPostPage: FC = () => {
  let history = useHistory();
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const EnhancedPostForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      title: '',
      body: '',
      tags: [],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await createPost({
        variables: {
          title: values.title,
          body: values.body,
          tagList: values.tagList,
        },
      });
      history.push('/posts');
    },
  })(PostForm);

  return (
    <Container>
      <Box>
        <Typography variant="h1" component="div" gutterBottom>
          New Post
        </Typography>
        <EnhancedPostForm />
      </Box>
    </Container>
  );
};

export default NewPostPage;
