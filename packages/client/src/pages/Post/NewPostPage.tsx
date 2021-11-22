import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../operations/mutations/createPost';
import { GET_ALL_POSTS } from '../../operations/queries/getAllPosts';

import PostForm, { FormValues, validationSchema } from './PostForm';

const NewPostPage: FC = () => {
  let history = useHistory();
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const EnhancedLoginForm = withFormik<{}, FormValues>({
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
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default NewPostPage;
