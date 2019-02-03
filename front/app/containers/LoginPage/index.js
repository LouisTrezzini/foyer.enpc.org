/**
 *
 * LoginPage
 *
 */

import { loginAction } from 'containers/App/actions';
import { makeSelectAuth } from 'containers/App/selectors/auth';
import logo from 'images/foyer.jpg';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

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
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      console.log(this.props.location);
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }

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
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
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

export default compose(withConnect)(LoginPage);
