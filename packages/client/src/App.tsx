import React, { ReactElement, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Home = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./user/SignIn/SignInPage'));
const Register = lazy(() => import('./user/SignUp/SignUpPage'));
const NoMatch = lazy(() => import('./pages/NoMatchPage'));

const App = (): ReactElement => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
