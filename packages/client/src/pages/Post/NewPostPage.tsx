import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';

import { gql, useMutation } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreateArticle($title: String!, $body: String!) {
    createArticle(title: $title, body: $body) {
      article {
        id
        title
      }
    }
  }
`;

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';

const NewPostPage: FC = () => {
  const [createArticle, { data, loading, error }] = useMutation(CREATE_POST);

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      title: '',
      body: '',
      tags: [''],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await createArticle({
        variables: {
          title: values.title,
          body: values.body,
        },
      });
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
