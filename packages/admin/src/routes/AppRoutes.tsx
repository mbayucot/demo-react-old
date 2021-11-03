import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { AbilityContext, defineAbilityFor } from '../config/can';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { NoMatchPage, UnAuthorizedPage } from '@demo/shared';

const Home = lazy(() => import('../pages/Home/HomePage'));
const Login = lazy(() => import('../user/SignIn/SignInPage'));
const Dashboard = lazy(() => import('../pages/DashboardPage'));
const UserList = lazy(() => import('../pages/User/UserListPage'));
const PostList = lazy(() => import('../pages/Post/PostListPage'));
const Profile = lazy(() => import('../user/Profile/ProfilePage'));
const NewUser = lazy(() => import('../pages/User/NewUserPage'));
const EditUser = lazy(() => import('../pages/User/EditUserPage'));
const NewPost = lazy(() => import('../pages/Post/NewPostPage'));
const EditPost = lazy(() => import('../pages/Post/EditPostPage'));
const PostDetail = lazy(() => import('../pages/PostDetail/PostDetailPage'));
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

          <PrivateRoute path="/users/:id/edit">
            <EditUser />
          </PrivateRoute>

          <PrivateRoute path="/users/new">
            <NewUser />
          </PrivateRoute>

          <PrivateRoute path="/users">
            <UserList />
          </PrivateRoute>

          <Route path="/post/:slug">
            <PostDetail />
          </Route>

          <PrivateRoute path="/posts/:id/edit">
            <EditPost />
          </PrivateRoute>

          <PrivateRoute path="/posts/new">
            <NewPost />
          </PrivateRoute>

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
