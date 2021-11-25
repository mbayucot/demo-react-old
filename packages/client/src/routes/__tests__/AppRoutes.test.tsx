import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../../App';

describe('AppRoutes', () => {
  const leftClick = { button: 0 };

  it('should navigate to login', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Sign in/i), leftClick);
    expect(await screen.findByText(/sign in to account/i)).toBeInTheDocument();
  });

  it('should navigate to register', async () => {
    renderWithRouter(<App />);
    expect(await screen.findByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/sign up/i), leftClick);
    expect(await screen.findByText(/create your account/i)).toBeInTheDocument();
  });

  it('should navigate to a bad page', async () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' });
    expect(await screen.findByText(/Oops! That page can’t be found./i)).toBeInTheDocument();
  });
});
