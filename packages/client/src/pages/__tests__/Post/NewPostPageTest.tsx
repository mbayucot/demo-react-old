import React from 'react';
import { render, screen, act, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../../client';
import NewPostPage from '../../Post/NewPostPage';
import '../../../mockedGraphQLServer';

describe('ProfilePage', () => {
  it('should render page', async () => {
    render(<NewPostPage />);
    console.log('here');
  });
});
