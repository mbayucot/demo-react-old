import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SignInForm from '@demo/client/src/user/SignIn/SignInForm';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import { login } from '../../features/authentication/authenticationSlice';

import { LoginFormValues, validationSchema } from '@demo/client/src/user/SignIn/SignInForm';

const SignInPage: FC = () => {
  const loader = useSelector((state: RootState) => state.authentication.loader);
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

  return (
    <Container>
      <Box>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
