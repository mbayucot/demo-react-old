import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import UserForm from '@demo/admin/src/pages/User/UserForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_USER } from '../../operations/queries/getUser';
import { UPDATE_USER } from '../../user/Profile/ProfilePage';

import { FormValues, validationSchema } from '@demo/admin/src/pages/User/UserForm';

type Params = {
  id: string;
};

const EditUserPage: FC = () => {
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

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
          id: id,
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

export default EditUserPage;
