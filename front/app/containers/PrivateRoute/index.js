/**
 *
 * PrivateRoute
 *
 */

import { makeSelectAuth } from 'containers/App/selectors/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/* eslint-disable react/prefer-stateless-function */
export class PrivateRoute extends React.Component {
  render() {
    const { auth, children, ...rest } = this.props;
    return (
      <Route {...rest}>
        {auth.isAuthenticated ? (
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
