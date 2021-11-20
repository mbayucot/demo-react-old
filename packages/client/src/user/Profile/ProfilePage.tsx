import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProfileForm from '@demo/client/src/user/Profile/ProfileForm';

import { FormValues, validationSchema } from '@demo/client/src/user/Profile/ProfileForm';

const ProfilePage: FC = () => {
  const EnhancedLoginForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
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
