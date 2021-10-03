import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';
import { useParams } from 'react-router-dom';

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';

type Params = {
  id: string;
};

const EditPostPage: FC = () => {
  let { id } = useParams<Params>();

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      title: '',
      body: '',
      tags: [''],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
    },
  })(PostForm);

  return (
    <Container>
      <Box>
        {id}
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default EditPostPage;
