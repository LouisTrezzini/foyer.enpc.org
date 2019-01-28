/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPrivateRoute from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class PrivateRoute extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Route {...rest}>
        {true ? ( // FIXME
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  privateRoute: makeSelectPrivateRoute(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'privateRoute', reducer });
const withSaga = injectSaga({ key: 'privateRoute', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PrivateRoute);
