import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { User } from '@demo/shared';

export type FormValues = Pick<User, 'email' | 'firstName' | 'lastName' | 'password' | 'role'>;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(32, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(32, 'Last name is too long'),
  role: Yup.string().required('Role is required'),
  password: Yup.string().required('Password is required'),
  //password: Yup.string().min(8, 'Password is too short').max(20, 'Password is too long'),
  //.matches(
  //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  // 'Must contain 8 characters, one uppercase, one\n' +
  //  '                lowercase, one Number and one special case character',
  //),
});

const UserForm = (props: FormikProps<FormValues>): React.ReactElement => {
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
        id="firstName"
        label="First name"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        value={values.firstName}
        onChange={handleChange}
        error={touched.firstName && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last name"
        name="lastName"
        autoComplete="lastName"
        autoFocus
        value={values.lastName}
        onChange={handleChange}
        error={touched.lastName && Boolean(errors.lastName)}
        helperText={touched.lastName && errors.lastName}
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
      <FormControl fullWidth>
        <Select id="role" name="role" value={values.role} label="Role" onChange={handleChange}>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <LoadingButton type="submit" loading={isSubmitting} loadingIndicator="Loading..." variant="outlined">
        Save
      </LoadingButton>
    </Box>
  );
};

export default UserForm;
