import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/admin/src/pages/User/UserForm';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_USER } from '../../operations/queries/getUser';
import { UPDATE_USER } from '../../user/Profile/ProfilePage';

import { LoginFormValues, validationSchema } from '@demo/admin/src/pages/User/UserForm';

type Params = {
  id: string;
};

type UserAttributes = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

const EditUserPage: FC = () => {
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

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
          id: id,
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

export default EditUserPage;
