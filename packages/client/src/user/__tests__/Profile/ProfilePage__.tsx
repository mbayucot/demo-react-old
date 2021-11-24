import React from 'react';

import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../../client';
import ProfilePage from '../../Profile/ProfilePage';
import '../../../mockedGraphQLServer';

const setup = () => {
  const props = {
    id: 1,
  };
  const utils = render(
    <ApolloProvider client={client}>
      <ProfilePage />
    </ApolloProvider>,
  );
  const changeEmailInput = (value: string) => userEvent.type(utils.getByLabelText(/first name/i), value);
  const changeLastNameInput = (value: string) => userEvent.type(utils.getByLabelText(/last name/i), value);
  const changePasswordInput = (value: string) => userEvent.type(utils.getByLabelText(/password/i), value);
  return {
    changeEmailInput,
    changeLastNameInput,
    changePasswordInput,
  };
};

describe('ProfilePage', () => {
  it('should render page', async () => {
    setup();

    //const dialogUtils = within(screen.getByRole('dialog'));
    await waitForElementToBeRemoved(() => screen.findByText(/Loading.../i));
  });
});
