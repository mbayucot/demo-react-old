import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SignInForm from '@demo/client/src/user/SignIn/SignInForm';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState } from '../../../app/store';

import { login } from '../../../features/authentication/authenticationSlice';

import { LoginFormValues, validationSchema } from '@demo/client/src/user/SignIn/SignInForm';

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
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Box>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
