import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';

import { CREATE_SUBSCRIPTION } from '@demo/shared';

import CardSection from './CardSection';

export default function CheckoutForm() {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>();
  const [createSubscription, { data, loading, error: mutationError }] = useMutation(CREATE_SUBSCRIPTION);

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    // @ts-ignore
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      setError(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      await stripeTokenHandler(result.token);
    }
  };

  const stripeTokenHandler = async (token: any) => {
    await createSubscription({
      variables: {
        token: token.id,
      },
    });
    history.push('/posts');
  };

  if (error) return <Alert severity="error">${error}</Alert>;
  if (mutationError) return <Alert severity="error">${mutationError.message}</Alert>;

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
