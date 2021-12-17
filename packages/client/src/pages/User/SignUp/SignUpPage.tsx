import React, { FC } from 'react';
import { withFormik } from 'formik';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

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
          Create your account
        </Typography>
        {authState.authentication.error && <Alert severity="error">${authState.authentication.error}</Alert>}
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignUpPage;
