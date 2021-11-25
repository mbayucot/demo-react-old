import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/admin/src/pages/User/UserForm';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_USERS } from '../../operations/queries/getUsers';
import { CREATE_USER } from '../../operations/mutations/createUser';

import { FormValues, validationSchema } from '@demo/admin/src/pages/User/UserForm';

const NewUserPage: FC = () => {
  let history = useHistory();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const EnhancedLoginForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await createUser({
        variables: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        },
      });
      history.push('/users');
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
