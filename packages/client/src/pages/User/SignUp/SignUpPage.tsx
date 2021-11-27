import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
