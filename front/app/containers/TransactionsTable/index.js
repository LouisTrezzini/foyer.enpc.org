/**
 *
 * TransactionsTable
 *
 */

import CurrencyFormat from 'components/CurrencyFormat';
import { deleteTransactionAction } from 'containers/TransactionsTable/actions';
import DeleteButton from 'containers/TransactionsTable/DeleteButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Pagination, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { formatBeerName, formatDate, formatFullName } from 'utils/formatters';

const AvatarWrapper = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  border-right: 1px solid rgba(34, 36, 38, 0.15);
  height: 58px;
  width: 58px;
`;

const UserHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

function Avatar({ src }) {
  return (
    <AvatarWrapper
      style={{
        backgroundImage: src
          ? `url(https://upont.enpc.fr/api/${src})`
          : undefined,
      }}
    />
  );
}

function UserHeader({ user }) {
  const fullName = formatFullName(user);
  return (
    <UserHeaderWrapper>
      <Avatar src={user.image_url} />
      <span style={{ margin: '.78571429em .78571429em' }}>{fullName}</span>
    </UserHeaderWrapper>
  );
}

/* eslint-disable react/prefer-stateless-function */
class TransactionsTable extends React.Component {
  handlePaginationChange = (event, data) => {
    const { fetchTransactions } = this.props;

    if (!fetchTransactions) {
      return;
    }
    const { activePage } = data;
    fetchTransactions(activePage);
  };

  render() {
    const { transactions } = this.props;
    const {
      current_page: activePage,
      total_pages: totalPages,
    } = transactions.pagination_infos;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Étudiant</Table.HeaderCell>
            <Table.HeaderCell>Boisson</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Valeur</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions.data.map(transaction =>
            this.renderTransaction(transaction),
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Pagination
                floated="right"
                activePage={activePage}
                onPageChange={this.handlePaginationChange}
                totalPages={totalPages}
                prevItem={null}
                nextItem={null}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  renderTransaction(transaction) {
    const { deleteTransaction } = this.props;
    return (
      <Table.Row key={transaction.id}>
        <Table.Cell style={{ padding: '0 0 0 0' }}>
          <UserHeader user={transaction.user} />
        </Table.Cell>
        <Table.Cell>{formatBeerName(transaction.beer)}</Table.Cell>
        <Table.Cell>{formatDate(transaction.date)}</Table.Cell>
        <Table.Cell
          collapsing
          negative={transaction.amount < 0}
          positive={transaction.amount > 0}
        >
          <CurrencyFormat value={transaction.amount} />
        </Table.Cell>
        <Table.Cell collapsing>
          <Button.Group>
            <Button icon="user" />
          </Button.Group>{' '}
          <Button.Group>
            <DeleteButton
              transaction={transaction}
              deleteTransaction={deleteTransaction}
            />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

TransactionsTable.propTypes = {
  transactions: PropTypes.object.isRequired,
  fetchTransactions: PropTypes.func,
  deleteTransaction: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    deleteTransaction: transaction =>
      dispatch(deleteTransactionAction(transaction)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionsTable);
