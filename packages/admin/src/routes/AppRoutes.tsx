import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AbilityContext, defineAbilityFor } from '../app/casl';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { NoMatchPage, UnAuthorizedPage } from '@demo/shared';

const Home = lazy(() => import('../pages/Home/HomePage'));
const Login = lazy(() => import('../pages/User/SignInPage'));
const Dashboard = lazy(() => import('../pages/DashboardPage'));
//const UserList = lazy(() => import('../pages/User/UserListPage'));
const PostList = lazy(() => import('../pages/Post/PostListPage'));
const Profile = lazy(() => import('../pages/User/ProfilePage'));
const PostDetail = lazy(() => import('../pages/Post/PostDetailPage'));
const NoMatch = NoMatchPage;
const UnAuthorized = UnAuthorizedPage;

const AppRoutes: FC = () => {
  const user = useSelector((state: RootState) => state.authentication.user);
  const ability = defineAbilityFor(user);

  return (
    <AbilityContext.Provider value={ability}>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <Route path="/post/:slug">
            <PostDetail />
          </Route>

          <PrivateRoute path="/posts">
            <PostList />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Route path="*">
            <NoMatch />
          </Route>

          <Route path="/unauthorized">
            <UnAuthorized />
          </Route>
        </Switch>
      </Suspense>
    </AbilityContext.Provider>
  );
};

export default AppRoutes;
