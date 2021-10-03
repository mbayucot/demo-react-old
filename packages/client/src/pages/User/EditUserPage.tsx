import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/client/src/pages/User/UserForm';
import { useParams } from 'react-router-dom';

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/User/UserForm';

type Params = {
  id: string;
};

const EditUserPage: FC = () => {
  let { id } = useParams<Params>();

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      role: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
    },
  })(UserForm);

  return (
    <Container>
      <Box>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default EditUserPage;
