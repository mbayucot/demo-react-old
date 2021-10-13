import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import Layout from '../layouts/private/Layout';

import { RootState } from '../app/store';

interface RouterProps extends RouteProps {
  title?: string;
}

const PrivateRoute = ({ children, title, ...rest }: RouterProps): React.ReactElement => {
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated);

  return (
    <Route
      {...rest}
      render={() => (
        <>
          {isAuthenticated ? (
            <Layout>{children}</Layout>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default PrivateRoute;
