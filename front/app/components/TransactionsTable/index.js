/**
 *
 * TransactionsTable
 *
 */

import CurrencyFormat from 'components/CurrencyFormat';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Header, Icon, Menu, Table } from 'semantic-ui-react';
import makeFullName from 'utils/makeFullName';

/* eslint-disable react/prefer-stateless-function */
class TransactionsTable extends React.Component {
  render() {
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
          {this.props.transactions.map(transaction =>
            this.renderTransaction(transaction),
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  renderTransaction(transaction) {
    const fullName = makeFullName(transaction.user);
    return (
      <Table.Row key={transaction.id}>
        <Table.Cell>
          <Header
            as="h4"
            image={
              transaction.user.image_url
                ? `https://upont.enpc.fr/api/${transaction.user.image_url}`
                : null
            }
            content={fullName}
          />
        </Table.Cell>
        <Table.Cell>{transaction.beer ? transaction.beer.name : 'Rechargement'}</Table.Cell>
        <Table.Cell>{moment(transaction.date * 1000).format('lll')}</Table.Cell>
        <Table.Cell collapsing negative={transaction.amount < 0} positive={transaction.amount > 0}>
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
  transactions: PropTypes.array.isRequired,
};

export default TransactionsTable;
