import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Home = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../user/SignIn/SignInPage'));
const Register = lazy(() => import('../user/SignUp/SignUpPage'));
const Dashboard = lazy(() => import('../pages/DashboardPage'));
const NoMatch = lazy(() => import('../pages/NoMatchPage'));
const UserList = lazy(() => import('../pages/UserListPage'));
const PostList = lazy(() => import('../pages/PostListPage'));
const Profile = lazy(() => import('../user/Profile/ProfilePage'));
const NewUser = lazy(() => import('../pages/User/NewUserPage'));
const EditUser = lazy(() => import('../pages/User/EditUserPage'));
const NewPost = lazy(() => import('../pages/Post/NewPostPage'));
const EditPost = lazy(() => import('../pages/Post/EditPostPage'));

const AppRoutes: FC = () => {
  //const { user } = useAuth();

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

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/users/:id/edit" children={<EditUser />} />

        <Route path="/users/new">
          <NewUser />
        </Route>

        <Route path="/users">
          <UserList />
        </Route>

        <Route path="/posts/:id/edit" children={<EditPost />} />

        <Route path="/posts/new">
          <NewPost />
        </Route>

        <Route path="/posts">
          <PostList />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
