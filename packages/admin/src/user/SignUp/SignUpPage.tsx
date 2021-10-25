import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import SignUpForm from '@demo/admin/src/user/SignUp/SignUpForm';

import { LoginFormValues, validationSchema } from '@demo/admin/src/user/SignUp/SignUpForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { register } from '../../features/authentication/authenticationSlice';
import { Redirect } from 'react-router-dom';

const SignUpPage: FC = () => {
  const authState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      // @ts-ignore
      dispatch(register({ user: { ...values } }));
    },
  })(SignUpForm);

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

export default SignUpPage;
