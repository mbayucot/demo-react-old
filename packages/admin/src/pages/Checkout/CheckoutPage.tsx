import React, { FC } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

const CheckoutPage: FC = () => {
  const stripePromise = loadStripe(
    'pk_test_51IM5fpCP2UxaM2XCSK0n3lgrLmM6NdvaiROmgcX0Msm12wvlBjigxGuiSIJIPl1EIC8FqBl7JO4ruA8nbg9vQx4300jpbNSwK6',
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
