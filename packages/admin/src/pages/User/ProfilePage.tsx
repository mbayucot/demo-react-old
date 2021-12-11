import React, { FC } from 'react';
import { withFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { UPDATE_USER, GET_USER_PROFILE } from '@demo/shared';
import ProfileForm, { FormValues, validationSchema } from './ProfileForm';

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  const [updateUser] = useMutation(UPDATE_USER);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const EnhancedLoginForm = withFormik<FormValues, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      password: props.password,
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await updateUser({
        variables: {
          attributes: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });
    },
  })(ProfileForm);

  return (
    <Container>
      <Box>
        <EnhancedLoginForm {...data.user} />
      </Box>
    </Container>
  );
};

export default ProfilePage;
