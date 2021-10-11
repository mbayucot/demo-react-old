import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import Layout from '../layouts/private/Layout';

interface RouterProps extends RouteProps {
  title?: string;
}

const PrivateRoute = ({ children, title, ...rest }: RouterProps): React.ReactElement => {
  const isAuthenticated = localStorage.getItem('token');

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
