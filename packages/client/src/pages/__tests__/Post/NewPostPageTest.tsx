import React from 'react';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../../client';
import NewPostPage from '../../Post/NewPostPage';
import '../../../mockedGraphQLServer';

const setup = () => {
  const utils = render(<NewPostPage />);
  const changeEmailInput = (value: string) => userEvent.type(utils.getByLabelText(/title/i), value);
  const changeLastNameInput = (value: string) => userEvent.type(utils.getByLabelText(/body/i), value);
  return {
    changeEmailInput,
    changeLastNameInput,
  };
};

describe('ProfilePage', () => {
  it('should render page', async () => {
    //setup();
  });
});
