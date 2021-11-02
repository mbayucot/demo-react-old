import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

export type LoginFormValues = User;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  first_name: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(32, 'First name is too long'),
  last_name: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(32, 'Last name is too long'),
  role: Yup.string().required('Role is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .max(20, 'Password is too long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, one\n' +
        '                lowercase, one Number and one special case character',
    ),
});

const ProfileForm = (props: FormikProps<LoginFormValues>): React.ReactElement => {
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit } = props;

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <h1>Name</h1>
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Role"
            //onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            value={values.first_name}
            onChange={handleChange}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last name"
            name="last_name"
            autoComplete="last_name"
            autoFocus
            value={values.last_name}
            onChange={handleChange}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
          <h1>Account Management</h1>
          <p>New Password</p>
          <button>Set New Password</button>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileForm;
