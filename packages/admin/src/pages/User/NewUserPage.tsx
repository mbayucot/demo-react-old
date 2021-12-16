import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { GET_USERS, CREATE_USER } from '@demo/shared';
import UserForm, { FormValues, validationSchema } from './UserForm';

const NewUserPage: FC = () => {
  let history = useHistory();

  const [createUser, { error: mutationError }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const EnhancedUserForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await createUser({
        variables: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          role: values.role,
        },
      });
      history.push('/users');
    },
  })(UserForm);

  if (mutationError) return <Alert severity="error">${mutationError.message}</Alert>;

  return (
    <Container>
      <Box>
        <Typography variant="h1" component="div" gutterBottom>
          New User
        </Typography>
        <EnhancedUserForm />
      </Box>
    </Container>
  );
};

export default NewUserPage;
