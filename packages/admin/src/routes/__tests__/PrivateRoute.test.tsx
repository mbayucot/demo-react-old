import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../../App';

describe('PrivateRoute', () => {
  it('should redirect to login for private route', async () => {
    renderWithRouter(<App />, { route: '/posts' });
    expect(await screen.findByText(/sign in to account/i)).toBeInTheDocument();
  });
});
