import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { User } from '@demo/shared';

export type LoginFormValues = Pick<User, 'email' | 'password'>;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    //.min(8, 'Password is too short')
    //.max(20, 'Password is too long')
    .required('Password is required'),
});

const SignInForm = (props: FormikProps<LoginFormValues>): React.ReactElement => {
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit } = props;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
      <LoadingButton
        type="submit"
        loading={isSubmitting}
        loadingIndicator="Loading..."
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </LoadingButton>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to={'/register'} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;
