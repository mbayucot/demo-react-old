import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/admin/src/pages/User/UserForm';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { LoginFormValues, validationSchema } from '@demo/admin/src/pages/User/UserForm';

type UserAttributes = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

const GET_USER = gql`
  query GetUser {
    user {
      id
      email
      firstName
      lastName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($attributes: UserAttributes!) {
    updateUser(attributes: $attributes) {
      user {
        id
        email
      }
    }
  }
`;

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER);

  const [updateUser] = useMutation(UPDATE_USER);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const EnhancedLoginForm = withFormik<
    {
      lastName: string;
      firstName: string;
      email: string;
      password: string;
    },
    LoginFormValues
  >({
    mapPropsToValues: (props) => ({
      email: props.email || '',
      first_name: props.firstName || '',
      last_name: props.lastName || '',
      password: props.password || '',
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await updateUser({
        variables: {
          attributes: {
            firstName: values.first_name,
            lastName: values.last_name,
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
