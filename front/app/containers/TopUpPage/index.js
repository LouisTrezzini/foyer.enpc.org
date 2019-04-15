/**
 *
 * TopUpPage
 *
 */

import CurrencyFormat from 'components/CurrencyFormat';
import {
  closeSuccessDimmerAction,
  topUpAction,
} from 'containers/TopUpPage/actions';
import {
  makeSelectTopUpPageIsDimmed,
  makeSelectTopUpPageIsLoading,
  makeSelectTopUpPageMeta,
} from 'containers/TopUpPage/selectors';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

const initialState = {
  username: '',
  amount: '',
};

/* eslint-disable react/prefer-stateless-function */
export class TopUpPage extends React.Component {
  state = initialState;

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
    const { username, amount } = this.state;

    if (!username || !amount) {
      // FIXME display error
      return;
    }

    this.props.topUp(username, amount);
    event.preventDefault();
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <title>Rechargement</title>
        </Helmet>

        {this.renderDimmer()}

        {this.renderForm()}
      </div>
    );
  }

  renderForm() {
    const { isLoading } = this.props;
    const { username, amount } = this.state;

    return (
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
                name="username"
                onChange={this.handleInputChange}
                value={username}
                fluid
                placeholder="Étudiant"
                required
              />
              <Form.Input
                name="amount"
                onChange={this.handleInputChange}
                value={amount}
                fluid
                icon="euro"
                iconPosition="left"
                placeholder="Montant"
                type="number"
                step="0.01"
                required
              />

              <Button primary fluid size="large" loading={isLoading}>
                Recharger
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }

  renderDimmer() {
    const { isDimmed, meta } = this.props;

    if (!isDimmed) {
      return null;
    }

    return (
      <Dimmer active onClickOutside={this.dimmerOnClickOutside} page>
        <Header as="h2" icon inverted>
          <Icon name="checkmark" />
          Rechargement réussi
          <Header.Subheader>
            Ajout de <CurrencyFormat value={meta.amount} /> sur le compte "
            {meta.username}"
          </Header.Subheader>
        </Header>
      </Dimmer>
    );
  }

  dimmerOnClickOutside = () => {
    this.props.closeSuccessDimmer();
    this.setState(initialState);
  };
}

TopUpPage.propTypes = {
  isDimmed: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  meta: PropTypes.object,
  topUp: PropTypes.func.isRequired,
  closeSuccessDimmer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isDimmed: makeSelectTopUpPageIsDimmed(),
  isLoading: makeSelectTopUpPageIsLoading(),
  meta: makeSelectTopUpPageMeta(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeSuccessDimmer: () => dispatch(closeSuccessDimmerAction()),
    topUp: (username, amount) => dispatch(topUpAction(username, amount)),
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
