/**
 *
 * TransactionsPage
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
import { Button, Header, Icon, Image, Menu, Table } from 'semantic-ui-react';
import makeSelectTransactionsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class TransactionsPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Transactions</title>
        </Helmet>

        <Header>Historique des transactions</Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Étudiant</Table.HeaderCell>
              <Table.HeaderCell>Boisson</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    rounded
                    size="mini"
                  />
                  Gabriel Plantier
                </Header>
              </Table.Cell>
              <Table.Cell>Triple Karmeliet</Table.Cell>
              <Table.Cell>25/01/2019 à 01:12</Table.Cell>
              <Table.Cell>
                <Button icon="user" />
                <Button icon="delete" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
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
      </div>
    );
  }
}

TransactionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionsPage: makeSelectTransactionsPage(),
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
