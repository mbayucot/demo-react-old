import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { GET_USER, GET_USERS, UPDATE_USER } from '@demo/shared';
import UserForm, { FormValues, validationSchema } from './UserForm';

type Params = {
  id: string;
};

const EditUserPage: FC = () => {
  let history = useHistory();
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const EnhancedUserForm = withFormik<FormValues, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await updateUser({
        variables: {
          id: id,
          attributes: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
      history.push('/users');
    },
  })(UserForm);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">${error.message}</Alert>;
  if (mutationError) return <Alert severity="error">${mutationError.message}</Alert>;

  return (
    <Container>
      <Box>
        <Typography variant="h1" component="div" gutterBottom>
          Edit User
        </Typography>
        <EnhancedUserForm {...data.user} />
      </Box>
    </Container>
  );
};

export default EditUserPage;
