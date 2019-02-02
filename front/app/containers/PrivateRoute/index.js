/**
 *
 * PrivateRoute
 *
 */

import { makeSelectIsAuthenticated } from 'containers/App/selectors/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/* eslint-disable react/prefer-stateless-function */
export class PrivateRoute extends React.Component {
  render() {
    const { isAuthenticated, children, ...rest } = this.props;
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
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
