/**
 *
 * PrivateRoute
 *
 */

import { makeSelectLocation } from 'containers/App/selectors';
import { makeSelectIsAuthenticated } from 'containers/App/selectors/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

export function PrivateRoute({ isAuthenticated, children, ...rest }) {
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: rest.location },
          }}
        />
      )}
    </Route>
  );
}

PrivateRoute.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.element,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  isAuthenticated: makeSelectIsAuthenticated(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
