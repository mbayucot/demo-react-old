import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { NoMatchPage, UnAuthorizedPage } from '@demo/shared';

const Home = lazy(() => import('../pages/Home/HomePage'));
const Login = lazy(() => import('../pages/User/SignIn/SignInPage'));
const Register = lazy(() => import('../pages/User/SignUp/SignUpPage'));
const PostList = lazy(() => import('../pages/Post/PostListPage'));
const Profile = lazy(() => import('../pages/User/Profile/ProfilePage'));
const NewPost = lazy(() => import('../pages/Post/NewPostPage'));
const EditPost = lazy(() => import('../pages/Post/EditPostPage'));
const PostDetail = lazy(() => import('../pages/Post/PostDetailPage'));
const Checkout = lazy(() => import('../pages/Checkout/CheckoutPage'));
const NoMatch = NoMatchPage;
const UnAuthorized = UnAuthorizedPage;

const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        <PublicRoute exact path="/" title="Demo">
          <Home />
        </PublicRoute>

        <PublicRoute path="/login" title="Login">
          <Login />
        </PublicRoute>

        <PublicRoute path="/register" title="Sign Up">
          <Register />
        </PublicRoute>

        <Route path="/post/:slug">
          <PostDetail />
        </Route>

        <PrivateRoute path="/posts/:id/edit" title="Edit Post">
          <EditPost />
        </PrivateRoute>

        <PrivateRoute path="/posts/new" title="New Post">
          <NewPost />
        </PrivateRoute>

        <PrivateRoute path="/posts" title="Posts">
          <PostList />
        </PrivateRoute>

        <PrivateRoute path="/profile" title="Profile">
          <Profile />
        </PrivateRoute>

        <PrivateRoute path="/checkout" title="Checkout">
          <Checkout />
        </PrivateRoute>

        <Route path="*">
          <NoMatch />
        </Route>

        <Route path="/unauthorized">
          <UnAuthorized />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
