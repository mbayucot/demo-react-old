import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/admin/src/pages/User/UserForm';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../operations/mutations/createUser';

import { LoginFormValues, validationSchema } from '@demo/admin/src/pages/User/UserForm';

const NewUserPage: FC = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await createUser({
        variables: {
          email: values.email,
          firstName: values.first_name,
          lastName: values.last_name,
          password: values.password,
        },
      });
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

export default NewUserPage;
