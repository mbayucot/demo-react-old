import React, { FC, useState } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useQuery, useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';

import { UPDATE_USER, GET_USER_PROFILE } from '@demo/shared';

import UserForm, { FormValues, validationSchema } from './ProfileForm';

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
    /**
     *
     const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY!);
     const { url } = await stripe!.billingPortal.sessions.create({
      customer: data.user.stripeCustomerId,
      return_url: `${process.env.STRIPE_SECRET_KEY_LIVE}/profile`,
    });
     window.location.href = url;
     */
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
