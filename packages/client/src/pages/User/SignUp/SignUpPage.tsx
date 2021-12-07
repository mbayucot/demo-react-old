import React, { FC } from 'react';
import { withFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import SignUpForm, { FormValues, validationSchema } from './SignUpForm';

import { RootState } from '../../../app/store';
import { register } from '../../../features/authentication/authenticationSlice';

const SignUpPage: FC = () => {
  const authState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const EnhancedLoginForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      // @ts-ignore
      dispatch(register({ user: { ...values } }));
    },
  })(SignUpForm);

  if (authState.authentication.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  if (authState.authentication.error) {
    return <Alert severity="error">${authState.authentication.error}</Alert>;
  }

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          Create your account
        </Typography>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignUpPage;
