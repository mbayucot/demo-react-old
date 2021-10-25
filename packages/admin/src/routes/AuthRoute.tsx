import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Helmet from 'react-helmet';

interface AuthRouteProps extends RouteProps {
  title: string;
}

const AuthRoute = ({ children, title, ...rest }: AuthRouteProps): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Helmet title={title} />
          <div>{children}</div>
        </>
      )}
    />
  );
};

export default AuthRoute;
