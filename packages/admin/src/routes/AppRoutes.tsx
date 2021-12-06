import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AbilityContext, defineAbilityFor } from '../app/casl';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { NoMatchPage, UnAuthorizedPage } from '@demo/shared';

const Login = lazy(() => import('../pages/User/SignInPage'));
const UserList = lazy(() => import('../pages/User/UserListPage'));
const NewUser = lazy(() => import('../pages/User/NewUserPage'));
const EditUser = lazy(() => import('../pages/User/EditUserPage'));
const PostList = lazy(() => import('../pages/Post/PostListPage'));
const NewPost = lazy(() => import('../pages/Post/NewPostPage'));
const EditPost = lazy(() => import('../pages/Post/EditPostPage'));
const Profile = lazy(() => import('../pages/User/ProfilePage'));
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
            <Login />
          </Route>

          <PrivateRoute path="/posts/new">
            <NewPost />
          </PrivateRoute>

          <PrivateRoute path="/posts/:id/edit">
            <EditPost />
          </PrivateRoute>

          <PrivateRoute path="/posts">
            <PostList />
          </PrivateRoute>

          <PrivateRoute path="/users/new">
            <NewUser />
          </PrivateRoute>

          <PrivateRoute path="/users">
            <UserList />
          </PrivateRoute>

          <PrivateRoute path="/users/:id/edit">
            <EditUser />
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
