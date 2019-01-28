/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import logo from 'images/foyer.jpg';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <title>Rechargement</title>
        </Helmet>

        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image size="medium" src={logo} centered />

            <Header as="h2" textAlign="center">
              Connexion
            </Header>

            <Form size="large">
              <Segment>
                <Form.Input fluid icon="user" placeholder="Username" />
                <Form.Input
                  fluid
                  icon="lock"
                  placeholder="Mot de passe"
                  type="password"
                />

                <Button primary fluid size="large">
                  Se connecter
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
