/**
 *
 * LoginPage
 *
 */

import { loginAction } from 'containers/LoginPage/actions';
import logo from 'images/foyer.jpg';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectLoginPage from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  handleInputChange = (event, { name, value }) =>
    this.setState({ [name]: value });

  handleSubmit = event => {
    const { username, password } = this.state;
    this.props.login(username, password);
    event.preventDefault();
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <title>Connexion</title>
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

            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  name="username"
                  onChange={this.handleInputChange}
                  fluid
                  icon="user"
                  placeholder="Username"
                  required
                />
                <Form.Input
                  name="password"
                  onChange={this.handleInputChange}
                  fluid
                  icon="lock"
                  placeholder="Mot de passe"
                  type="password"
                  required
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
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(loginAction(username, password));
    },
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
