import reducer, {
  login,
  register,
  logout,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  initialState,
} from '../../authentication/authenticationSlice';

test('should return the initial state', () => {
  // @ts-ignore
  expect(reducer(undefined, {})).toEqual({
    isAuthenticated: false,
    loader: false,
  });
});

test('should handle login', () => {
  expect(reducer(initialState, login())).toEqual({
    isAuthenticated: false,
    loader: true,
  });
});

test('should handle register', () => {
  expect(reducer(initialState, register())).toEqual({
    isAuthenticated: false,
    loader: true,
  });
});

test('should handle loginSuccess', () => {
  expect(reducer(initialState, loginSuccess('fake token'))).toEqual({
    isAuthenticated: true,
    loader: false,
  });
});

test('should handle loginFailure', () => {
  expect(reducer(initialState, loginFailure())).toEqual({
    isAuthenticated: false,
    loader: false,
  });
});

test('should handle logout', () => {
  expect(reducer(initialState, logout())).toEqual({
    isAuthenticated: false,
    loader: false,
  });
});

test('should handle logoutSuccess', () => {
  expect(reducer(initialState, logoutSuccess())).toEqual({
    isAuthenticated: false,
    loader: false,
  });
});

test('should handle logoutFailure', () => {
  expect(reducer(initialState, logoutFailure())).toEqual({
    isAuthenticated: false,
    loader: false,
  });
});
