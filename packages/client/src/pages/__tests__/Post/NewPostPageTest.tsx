import React from 'react';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import faker from 'faker';
import { MemoryRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { setupServer } from 'msw/node';

import { client } from '../../../client';
import NewPostPage from '../../Post/NewPostPage';
import { req } from '../../../mockedGraphQLServer';

const setup = () => {
  const utils = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/my/initial/route']}>
        <NewPostPage />
        <Route path="/posts">
          <div>Posts</div>
        </Route>
      </MemoryRouter>
    </ApolloProvider>,
  );
  const title = utils.getByLabelText(/title/i) as HTMLInputElement;
  const changeTitleInput = (value: string) => userEvent.type(utils.getByLabelText(/title/i), value);
  const changeBodyInput = (value: string) => userEvent.type(utils.getByLabelText(/body/i), value);
  const submitButton = screen.getByRole('button', {
    name: /save/i,
  });
  const clickSubmit = () => userEvent.click(submitButton);
  return {
    utils,
    title,
    changeTitleInput,
    changeBodyInput,
    clickSubmit,
  };
};

describe('ProfilePage', () => {
  const server = setupServer(req);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should render page', async () => {
    const { utils, changeTitleInput, changeBodyInput, clickSubmit, title } = setup();
    changeTitleInput('john');
    changeBodyInput(faker.random.word());
    await clickSubmit();
    await waitForElementToBeRemoved(() => utils.queryByText('Loading...'));
    await waitFor(() => utils.findByText(/posts/i));
  });
});
