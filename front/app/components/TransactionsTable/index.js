/**
 *
 * TransactionsTable
 *
 */

import CurrencyFormat from 'components/CurrencyFormat';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Pagination, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import makeFullName from 'utils/makeFullName';

const AvatarWrapper = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  border: 2px solid black;
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
  const fullName = makeFullName(user);
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
                activePage={transactions.pagination_infos.current_page}
                // onPageChange={this.handlePaginationChange}
                totalPages={transactions.pagination_infos.total_pages}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  renderTransaction(transaction) {
    return (
      <Table.Row key={transaction.id}>
        <Table.Cell style={{ padding: '0 0 0 0' }}>
          <UserHeader user={transaction.user} />
        </Table.Cell>
        <Table.Cell>
          {transaction.beer ? transaction.beer.name : 'Rechargement'}
        </Table.Cell>
        <Table.Cell>{moment(transaction.date * 1000).format('lll')}</Table.Cell>
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
            <Button icon="delete" negative />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

TransactionsTable.propTypes = {
  transactions: PropTypes.object.isRequired,
};

export default TransactionsTable;
