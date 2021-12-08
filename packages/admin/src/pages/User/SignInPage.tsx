import React, { FC } from 'react';
import { withFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { RootState } from '../../app/store';

import { login } from '../../features/authentication/authenticationSlice';

import SignInForm, { FormValues, validationSchema } from './SignInForm';

const SignInPage: FC = () => {
  const authState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const EnhancedLoginForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      // @ts-ignore
      dispatch(login({ user: { ...values } }));
    },
  })(SignInForm);

  console.log(authState.authentication.isAuthenticated);

  if (authState.authentication.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  /**
   *
   if (authState.authentication.error) {
    return <Alert severity="error">${authState.authentication.error}</Alert>;
  }
   */

  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5">
          Sign In to Account
        </Typography>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
