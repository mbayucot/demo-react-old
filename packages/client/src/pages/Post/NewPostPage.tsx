import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { CREATE_POST, GET_ALL_POSTS } from '@demo/shared';
import PostForm, { FormValues, validationSchema } from './PostForm';

const NewPostPage: FC = () => {
  let history = useHistory();
  const [createPost, { error: mutationError }] = useMutation(CREATE_POST, {
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
      console.log(values.tagList);
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

  if (mutationError) return <Alert severity="error">${mutationError.message}</Alert>;

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
