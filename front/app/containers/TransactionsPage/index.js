/**
 *
 * TransactionsPage
 *
 */

import TransactionsTable from 'components/TransactionsTable';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Header } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { fetchTransactionsAction } from './actions';
import reducer from './reducer';
import { makeSelectTransactions } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsPage extends React.Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { transactions } = this.props;
    return (
      <div>
        <Helmet>
          <title>Transactions</title>
        </Helmet>

        <Header as="h2">Historique des transactions</Header>

        <TransactionsTable transactions={transactions} />
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  transactions: PropTypes.array.isRequired,

  fetchTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: () => dispatch(fetchTransactionsAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transactionsPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(TransactionsPage);
