/**
 *
 * TransactionsPage
 *
 */

import TransactionsTable from 'containers/TransactionsTable';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Header, Loader } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { fetchTransactionsAction } from './actions';
import reducer from './reducer';
import {
  makeSelectTransactions,
  makeSelectTransactionsPageIsLoading,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsPage extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Transactions</title>
        </Helmet>

        <Header as="h2">Historique des transactions</Header>

        {this.renderTransactions()}
      </div>
    );
  }

  renderTransactions() {
    const { loading } = this.props;
    if (loading) {
      return <Loader active />;
    }

    const { transactions } = this.props;
    return (
      <TransactionsTable
        transactions={transactions}
        fetchTransactions={this.props.fetchTransactions}
      />
    );
  }
}

TransactionsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.object,

  fetchTransactions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTransactionsPageIsLoading(),
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: activePage =>
      dispatch(fetchTransactionsAction(activePage)),
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
