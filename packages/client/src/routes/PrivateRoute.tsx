import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Helmet from 'react-helmet';

import Layout from '../layouts/private/Layout';

interface RouterProps extends RouteProps {
  title?: string;
}

const PrivateRoute = ({ children, title, ...rest }: RouterProps): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Layout>{children}</Layout>
        </>
      )}
    />
  );
};

export default PrivateRoute;
