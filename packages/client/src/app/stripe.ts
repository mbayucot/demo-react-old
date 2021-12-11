import Stripe from 'stripe';

export const stripe = new Stripe(
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

export default stripe;
