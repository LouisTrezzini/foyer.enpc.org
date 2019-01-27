/**
 *
 * TopUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import makeSelectTopUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class TopUpPage extends React.Component {
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
            <Header as="h2" textAlign="center">
              Recharger un compte Foyer
            </Header>
            <Form size="large">
              <Segment>
                <UserSearchDropdown fluid placeholder="Étudiant" />
                <Form.Input
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
const withSaga = injectSaga({ key: 'topUpPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TopUpPage);
