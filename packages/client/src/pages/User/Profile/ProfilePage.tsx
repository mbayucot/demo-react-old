import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
//import stripe from '../../../app/stripe';
import Stripe from 'stripe';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER, GET_USER_PROFILE } from '@demo/shared';

import UserForm, { FormValues, validationSchema } from './ProfileForm';

const stripe = new Stripe(
  'sk_test_51IM5fpCP2UxaM2XCHKsCzNuJoXMtvDsUSyDHVt0wzZmhEZxUHUCszsqvhL3A1JqO8zm53TZL7EVAuu1VvJHjpVfx00qha7kEAT',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Demo',
      version: '0.1.0',
    },
  },
);

const ProfilePage: FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  const [updateUser, { error: mutationError }] = useMutation(UPDATE_USER);

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

  const handleAccount = async () => {
    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer: data.user.stripeCustomerId,
        return_url: `https://github.com/profile`,
      });
      window.location.href = url;
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">${error.message}</Alert>;
  if (mutationError) return <Alert severity="error">${mutationError.message}</Alert>;

  return (
    <Container>
      <Box>
        <EnhancedLoginForm {...data.user} />
        <button onClick={handleAccount}>Stripe Portal</button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
