/**
 *
 * TopUpPage
 *
 */

import UserSearchDropdown from 'containers/UserSearchDropdown';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import makeSelectTopUpPage from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class TopUpPage extends React.Component {
  state = { student: null };

  processValue(name, value) {
    if (name === 'amount') {
      return +value;
    }

    return value;
  }

  handleInputChange = (event, { name, value }) => {
    this.setState({ [name]: this.processValue(name, value) });
  };

  handleSubmit = event => {
    const { student, amount } = this.state;

    console.log(student, amount); // FIXME
    event.preventDefault();
  };

  render() {
    const { student } = this.state;
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
            <Header as="h2" textAlign="center">
              Recharger un compte Foyer
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment>
                <UserSearchDropdown
                  name="student"
                  onChange={this.handleInputChange}
                  value={student}
                  fluid
                  placeholder="Étudiant"
                />
                <Form.Input
                  name="amount"
                  onChange={this.handleInputChange}
                  fluid
                  icon="dollar"
                  placeholder="Montant"
                  type="number"
                  step="0.01"
                />

                <Button primary fluid size="large">
                  Recharger
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

TopUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  topUpPage: makeSelectTopUpPage(),
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

const withReducer = injectReducer({ key: 'topUpPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(TopUpPage);
