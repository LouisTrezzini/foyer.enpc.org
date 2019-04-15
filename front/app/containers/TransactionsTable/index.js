/**
 *
 * TransactionsTable
 *
 */

import CurrencyFormat from 'components/CurrencyFormat';
import PaginatedTable from 'components/PaginatedTable';
import { deleteTransactionAction } from 'containers/TransactionsTable/actions';
import DeleteButton from 'containers/TransactionsTable/DeleteButton';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Table } from 'semantic-ui-react';
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
  render() {
    const { transactions } = this.props;

    return (
      <PaginatedTable
        rows={transactions.data}
        renderHeader={this.renderHeader}
        renderRow={this.renderTransaction}
        paginationInfos={transactions.pagination_infos}
      />
    );
  }

  renderHeader = () => {
    return (
      <Table.Row>
        <Table.HeaderCell>Étudiant</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Valeur</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    );
  };

  renderTransaction = transaction => {
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
            <Button
              icon="user"
              as={Link}
              to={`/students/${transaction.user.username}`}
            />
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
  };
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
