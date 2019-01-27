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
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectTransactions } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsPage extends React.Component {
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
};

const mapStateToProps = createStructuredSelector({
  transactions: makeSelectTransactions(),
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

const withReducer = injectReducer({ key: 'transactionsPage', reducer });
const withSaga = injectSaga({ key: 'transactionsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionsPage);
