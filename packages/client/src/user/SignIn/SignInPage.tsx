import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SignInForm from '@demo/client/src/user/SignIn/SignInForm';

import { LoginFormValues, validationSchema } from '@demo/client/src/user/SignIn/SignInForm';

const SignInPage: FC = () => {
  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
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
