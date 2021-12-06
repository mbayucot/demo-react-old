import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Redirect } from 'react-router-dom';

import { RootState } from '../../../app/store';

import { login } from '../../../features/authentication/authenticationSlice';

import SignInForm, { LoginFormValues, validationSchema } from './SignInForm';

const SignInPage: FC = () => {
  const authState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      // @ts-ignore
      dispatch(login({ user: { ...values } }));
    },
  })(SignInForm);

  if (authState.authentication.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

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
