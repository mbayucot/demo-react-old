import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import { setupServer } from 'msw/node';
import faker from 'faker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../app/store';

import { client } from '../../client';
import SignUpPage from '../SignUp/SignUpPage';
import '../../mockedGraphQLServer';

import { handlers } from '../__mocks__/auth';

const setup = () => {
  const utils = render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={['/signup']}>
            <SignUpPage />
            <Route path="/dashboard">
              <div>Dashboard</div>
            </Route>
          </MemoryRouter>
        </ApolloProvider>
      </Provider>
    </PersistGate>,
  );
  const changeEmailInput = (value: string) => userEvent.type(utils.getByLabelText(/email address/i), value);
  const changePasswordInput = (value: string) => userEvent.type(utils.getByLabelText(/password/i), value);
  utils.debug(undefined, 300000);
  const submitButton = screen.getByRole('button', {
    name: /sign up/i,
  });
  const clickSubmit = () => userEvent.click(submitButton);
  return {
    utils,
    changeEmailInput,
    changePasswordInput,
    submitButton,
    clickSubmit,
  };
};

describe('SignUpPage', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should show validation errors', async () => {
    const { utils, changeEmailInput, changePasswordInput, clickSubmit } = setup();
    await act(async () => {
      await clickSubmit();
    });
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('should redirect to posts page after saving', async () => {
    const { utils, changeEmailInput, changePasswordInput, clickSubmit } = setup();
    changeEmailInput(faker.internet.email());
    changePasswordInput(faker.random.word());
    await clickSubmit();
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/dashboard/i));
  });
});
