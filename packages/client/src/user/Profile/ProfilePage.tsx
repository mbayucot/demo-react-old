import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProfileForm from '@demo/client/src/user/Profile/ProfileForm';

import { LoginFormValues, validationSchema } from '@demo/client/src/user/Profile/ProfileForm';

const ProfilePage: FC = () => {
  const EnhancedLoginForm = withFormik<{}, LoginFormValues>({
    mapPropsToValues: () => ({
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      role: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      console.log('here');
    },
  })(ProfileForm);

  return (
    <Container>
      <Box>
        <EnhancedLoginForm />
      </Box>
    </Container>
  );
};

export default ProfilePage;
