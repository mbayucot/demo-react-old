import React, { FC } from 'react';
import { withFormik } from 'formik';

import SignInForm from '@demo/client/src/user/SignIn/SignInForm';
import { LoginFormValues, validationSchema } from '@demo/client/src/user/SignIn/SignInForm';

const LoginForm: FC = () => {
  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
    },
  })(LoginForm);

  return <EnhancedLoginForm />;
};

export default LoginForm;
