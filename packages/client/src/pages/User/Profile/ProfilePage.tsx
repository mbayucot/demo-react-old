import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm, { FormValues, validationSchema } from './ProfileForm';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@demo/admin/src/operations/mutations/updateUser';
import { GET_USER } from '@demo/admin/src/operations/queries/getUser';

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER);

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
  })(UserForm);

  return (
    <Container>
      <Box>
        <EnhancedLoginForm {...data.user} />
      </Box>
    </Container>
  );
};

export default ProfilePage;
