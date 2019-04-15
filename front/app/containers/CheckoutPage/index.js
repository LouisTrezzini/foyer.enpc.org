/**
 *
 * CheckoutPage
 *
 */

import ContainImage from 'components/ContainImage';
import CurrencyFormat from 'components/CurrencyFormat';
import {
  fetchRecentTransactionsAction,
  fetchStudentAction,
} from 'containers/CheckoutPage/actions';
import {
  makeSelectCheckoutPageIsLoading,
  makeSelectCheckoutPageRecentDrinks,
  makeSelectCheckoutPageRecentTransactions,
  makeSelectCheckoutPageSelectedStudent,
} from 'containers/CheckoutPage/selectors';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Form,
  Grid,
  Header,
  Label,
  Loader,
  Segment,
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { formatBeerName, formatDate, formatFullName } from 'utils/formatters';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

const UsernameWrapper = styled.div`
  font-weight: 700;
  font-size: 1.12em;
  line-height: 1.12em;
  color: black;
`;

const DateWrapper = styled.div`
  font-size: 1em;
  color: rgba(0, 0, 0, 0.4);
`;

const DescriptionWrapper = styled.div``;

/* eslint-disable react/prefer-stateless-function */
export class CheckoutPage extends React.Component {
  state = {
    selectedDrinks: [],
  };

  componentDidMount() {
    this.props.fetchRecentTransactions();
  }

  selectUser = (event, { name, value }) => {
    this.props.fetchUser(value);
  };

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
  };

  selectDrink = drink => {
    this.setState(state => {
      return {
        selectedDrinks: [...state.selectedDrinks, drink],
      };
    });
  };

  deselectDrink = index => {
    this.setState(state => {
      return {
        selectedDrinks: [
          ...state.selectedDrinks.slice(0, index),
          ...state.selectedDrinks.slice(index + 1),
        ],
      };
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Encaissement</title>
        </Helmet>

        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" width={6}>
              <Header as="h2">Encaissement</Header>
            </Grid.Column>
          </Grid.Row>
          {this.renderContent()}
        </Grid>
      </div>
    );
  }

  renderContent() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Loader active />;
    }

    return (
      <Grid.Row>
        <Grid.Column width={11}>{this.renderCheckoutForm()}</Grid.Column>
        <Grid.Column width={5}>
          {this.renderRecentTransactionsTable()}
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderCheckoutForm() {
    const { isCheckoutLoading, recentDrinks, selectedStudent } = this.props;

    const { selectedDrinks } = this.state;

    console.log(selectedStudent);

    return (
      <Form size="large" onSubmit={this.handleSubmit}>
        <Segment.Group>
          <Segment>
            <Grid celled>
              <Grid.Column width={4} verticalAlign="middle">
                {this.renderStudent(selectedStudent)}
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid columns={3} stackable>
                  {selectedDrinks.map((drink, index) => (
                    <Grid.Column>{this.renderDrink(drink, index)}</Grid.Column>
                  ))}
                </Grid>
              </Grid.Column>
            </Grid>

            <UserSearchDropdown
              name="username"
              onChange={this.selectUser}
              value={selectedStudent ? selectedStudent.username : null}
              fluid
              placeholder="Étudiant"
            />
          </Segment>

          <Segment>
            <Button primary fluid loading={isCheckoutLoading}>
              Encaisser
            </Button>
          </Segment>
        </Segment.Group>

        <Grid columns={4} stackable>
          {recentDrinks.map(drink => (
            <Grid.Column>{this.renderDrink(drink)}</Grid.Column>
          ))}
        </Grid>
      </Form>
    );
  }

  renderDrink(drink, key = null) {
    return (
      <Segment
        as="a"
        key={key || drink.id}
        style={{
          display: 'block',
          cursor: 'pointer',
          width: 120,
          padding: '0 0 1em 0',
        }}
        onClick={
          key ? () => this.deselectDrink(key) : () => this.selectDrink(drink)
        }
      >
        <ContainImage size={120} src={'uploads/images/30.jpg'} />
        <Label attached="bottom" style={{ textAlign: 'center' }}>
          {drink.name} (<CurrencyFormat value={drink.price} />)
        </Label>
      </Segment>
    );
  }

  renderStudent(student) {
    return (
      <Segment
        style={{
          display: 'block',
          cursor: 'pointer',
          width: 120,
          padding: '0 0 1em 0',
        }}
      >
        <ContainImage size={120} src={student.image_url} />
        <Label
          attached="bottom"
          style={{ textAlign: 'center' }}
          color={student.balance <= 0 ? 'red' : 'green'}
        >
          <CurrencyFormat value={student.balance} />
        </Label>
      </Segment>
    );
  }

  renderRecentTransactionsTable() {
    const { recentTransactions } = this.props;

    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>
              Transactions récentes
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {recentTransactions.map(transaction =>
            this.renderRecentTransactionRow(transaction),
          )}
        </Table.Body>
      </Table>
    );
  }

  renderRecentTransactionRow(transaction) {
    return (
      <Table.Row
        key={transaction.id}
        negative={transaction.amount < 0}
        positive={transaction.amount > 0}
      >
        <Table.Cell style={{ padding: '0 0 0 0', width: 80 }}>
          <ContainImage size={80} src={transaction.user.image_url} />
        </Table.Cell>
        <Table.Cell>
          <UsernameWrapper>{formatFullName(transaction.user)}</UsernameWrapper>
          <DateWrapper>{formatDate(transaction.date)}</DateWrapper>
          <DescriptionWrapper>
            {formatBeerName(transaction.beer)} (
            <CurrencyFormat value={transaction.amount} />)
          </DescriptionWrapper>
        </Table.Cell>
      </Table.Row>
    );
  }
}

CheckoutPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isCheckoutLoading: PropTypes.bool.isRequired,
  recentTransactions: PropTypes.array.isRequired,
  recentDrinks: PropTypes.array.isRequired,
  selectedStudent: PropTypes.object,
  fetchRecentTransactions: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectCheckoutPageIsLoading(),
  isCheckoutLoading: makeSelectCheckoutPageIsLoading(),
  recentTransactions: makeSelectCheckoutPageRecentTransactions(),
  recentDrinks: makeSelectCheckoutPageRecentDrinks(),
  selectedStudent: makeSelectCheckoutPageSelectedStudent(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchRecentTransactions: () => dispatch(fetchRecentTransactionsAction()),
    fetchUser: username => dispatch(fetchStudentAction(username)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'checkoutPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(CheckoutPage);
