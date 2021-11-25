import React from 'react';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import faker from 'faker';
import { MemoryRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupServer } from 'msw/node';

import { apolloClient } from '../../../app/apolloClient';
import EditPostPage from '../../Post/EditPostPage';
import { graphqlHandler } from '../../../mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={apolloClient}>
      <MemoryRouter initialEntries={['/posts/1/edit']}>
        <Route path="/posts/:id/edit">
          <EditPostPage />
        </Route>
        <Route path="/posts">
          <div>Posts</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  return {
    utils,
  };
};

describe('EditPostPage', () => {
  const server = setupServer(graphqlHandler);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should redirect to posts page after saving', async () => {
    const { utils } = setup();
    await waitForElementToBeRemoved(() => utils.queryByText(/loading/i));

    const title = utils.getByLabelText(/title/i) as HTMLInputElement;
    const body = utils.getByLabelText(/body/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /save/i,
    });

    expect(title.value).not.toBeNull();
    expect(body.value).not.toBeNull();
    await userEvent.click(submitButton);
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/posts/i));
  });
});
