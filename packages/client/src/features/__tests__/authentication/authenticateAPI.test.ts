import { loginSaga, logoutSaga, registerSaga } from '../../authentication/authenticateAPI';
import { loginSuccess, logoutSuccess, loginFailure, logoutFailure } from '../../authentication/authenticationSlice';
import { setupServer } from 'msw/node';
import { expectSaga } from 'redux-saga-test-plan';
import { handlers } from '../../../pages/User/__mocks__/auth';

describe('ProfilePage', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('loginSaga works!', () => {
    const action = {
      payload: {
        user: {
          email: 'test@test.com',
          name: 'Tucker',
        },
      },
    };

    return (
      expectSaga(loginSaga, action)
        // Assert that the `put` will eventually happen.
        .put(loginSuccess('__test_token__'))

        // Dispatch any actions that the saga will `take`.
        .dispatch(loginSuccess('__test_token__'))

        // Start the test. Returns a Promise.
        .run()
    );
  });

  it('loginSaga error!', () => {
    const action = {
      payload: {
        user: {
          email: 'invalid@email.com',
          name: 'Tucker',
        },
      },
    };

    return (
      expectSaga(loginSaga, action)
        // Assert that the `put` will eventually happen.
        .put(loginFailure())

        // Dispatch any actions that the saga will `take`.
        .dispatch(loginFailure())

        // Start the test. Returns a Promise.
        .run()
    );
  });

  it('registerSaga works!', () => {
    const action = {
      payload: {
        user: {
          email: 'test@test.com',
          name: 'Tucker',
        },
      },
    };

    return (
      expectSaga(registerSaga, action)
        // Assert that the `put` will eventually happen.
        .put(loginSuccess('__test_token__'))

        // Dispatch any actions that the saga will `take`.
        .dispatch(loginSuccess('__test_token__'))

        // Start the test. Returns a Promise.
        .run()
    );
  });

  it('registerSaga error!', () => {
    const action = {
      payload: {
        user: {
          email: 'invalid@email.com',
          name: 'Tucker',
        },
      },
    };

    return (
      expectSaga(registerSaga, action)
        // Assert that the `put` will eventually happen.
        .put(loginFailure())

        // Dispatch any actions that the saga will `take`.
        .dispatch(loginFailure())

        // Start the test. Returns a Promise.
        .run()
    );
  });

  it('logoutSaga works!', () => {
    return (
      expectSaga(logoutSaga)
        // Assert that the `put` will eventually happen.
        .put(logoutSuccess())

        // Dispatch any actions that the saga will `take`.
        .dispatch(logoutSuccess())

        // Start the test. Returns a Promise.
        .run()
    );
  });
});
