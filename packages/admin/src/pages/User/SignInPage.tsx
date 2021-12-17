import React, { FC } from 'react';
import { withFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

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
      dispatch(login({ user: { ...values }, domain: 'author' }));
    },
  })(SignInForm);

  if (authState.authentication.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to account
        </Typography>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignInPage;
