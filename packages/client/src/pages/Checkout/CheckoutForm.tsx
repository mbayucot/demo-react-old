import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { gql, useMutation } from '@apollo/client';

import CardSection from './CardSection';

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($token: String!) {
    createSubscription(token: $token) {
      user {
        id
      }
    }
  }
`;

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [createSubscription, { data, loading, error }] = useMutation(CREATE_SUBSCRIPTION);

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
      console.log(result.error.message);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
