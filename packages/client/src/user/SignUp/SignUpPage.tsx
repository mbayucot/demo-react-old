import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import SignUpForm from '@demo/client/src/user/SignUp/SignUpForm';

import { LoginFormValues, validationSchema } from '@demo/client/src/user/SignUp/SignUpForm';

const SignUpPage: FC = () => {
  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
    },
  })(SignUpForm);

  return (
    <Container>
      <Box>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default SignUpPage;
