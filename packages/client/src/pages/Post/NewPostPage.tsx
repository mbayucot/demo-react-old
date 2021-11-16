import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../operations/mutations/createPost';

type Tag = {
  id: number;
  name: string;
};

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';

const NewPostPage: FC = () => {
  let history = useHistory();
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      title: '',
      body: '',
      tags: [],
      comments: [],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await createPost({
        variables: {
          title: values.title,
          body: values.body,
          tagList: values.tag_list,
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
