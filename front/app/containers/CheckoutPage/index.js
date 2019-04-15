/**
 *
 * CheckoutPage
 *
 */

import ContainImage from 'components/ContainImage';
import CurrencyFormat from 'components/CurrencyFormat';
import {
  checkoutAction,
  deselectDrinkAction,
  initCheckoutPageAction,
  resetCheckoutAction,
  selectDrinkAction,
  selectStudentAction,
} from 'containers/CheckoutPage/actions';
import {
  makeSelectCheckoutPageIsLoading,
  makeSelectCheckoutPageRecentDrinks,
  makeSelectCheckoutPageRecentTransactions,
  makeSelectCheckoutPageSelectedDrinks,
  makeSelectCheckoutPageSelectedStudent,
} from 'containers/CheckoutPage/selectors';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Loader,
  Segment,
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { formatBeerName, formatDate, formatFullName } from 'utils/formatters';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

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
    searchTerm: '',
  };

  componentDidMount() {
    this.props.initCheckoutPage();
  }

  selectUser = (event, { value }) => {
    this.props.selectStudent(value);
  };

  handleSubmit = () => {
    const { selectedStudent, selectedDrinks } = this.props;

    if (!selectedStudent || isEmpty(selectedDrinks)) {
      return;
    }

    this.props.checkout(selectedStudent, selectedDrinks);
  };

  handleDrinkSearch = (event, { value }) => {
    this.setState({ searchTerm: value });
  };

  get filteredDrinks() {
    const { searchTerm } = this.state;
    const { recentDrinks } = this.props;

    return recentDrinks.filter(drink =>
      drink.name.toLowerCase().includes(searchTerm),
    );
  }

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
    const {
      isCheckoutLoading,
      selectedStudent,
      selectedDrinks,
      resetCheckout,
    } = this.props;

    const totalCost = selectedDrinks.reduce(
      (sum, drink) => sum + drink.price,
      0,
    );
    const willHaveNegativeBalance = selectedStudent
      ? selectedStudent.balance - totalCost <= 0
      : false;

    return (
      <Form size="large">
        <Segment.Group>
          <Segment>
            <Grid padded style={{ minHeight: 164 }}>
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
            <Button.Group fluid>
              <Button
                primary={!willHaveNegativeBalance}
                negative={willHaveNegativeBalance}
                loading={isCheckoutLoading}
                onClick={this.handleSubmit}
              >
                Encaisser (<CurrencyFormat value={totalCost} />)
              </Button>
              <Button
                icon="close"
                onClick={resetCheckout}
                style={{ width: 42, flexGrow: 0 }}
              />
            </Button.Group>
          </Segment>
        </Segment.Group>

        <Divider hidden />

        <Grid>
          <Grid.Column floated="left" width={4}>
            <Header>Boissons</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={8}>
            <Input
              fluid
              size="mini"
              icon="search"
              placeholder="Filtrer..."
              onChange={this.handleDrinkSearch}
            />
          </Grid.Column>
        </Grid>

        <Grid columns={4} stackable>
          {this.filteredDrinks.map(drink => (
            <Grid.Column>{this.renderDrink(drink)}</Grid.Column>
          ))}
        </Grid>
      </Form>
    );
  }

  renderDrink(drink, key = null) {
    const { selectDrink, deselectDrink } = this.props;

    const isSelecting = key === null;
    return (
      <Segment
        as="a"
        key={isSelecting ? drink.id : key}
        style={{
          display: 'block',
          cursor: 'pointer',
          width: 120,
          padding: '0 0 1em 0',
        }}
        onClick={
          isSelecting ? () => selectDrink(drink) : () => deselectDrink(key)
        }
      >
        <ContainImage size={120} src={drink.image_url} />
        <Label attached="bottom" style={{ textAlign: 'center' }}>
          {drink.name} (<CurrencyFormat value={drink.price} />)
        </Label>
      </Segment>
    );
  }

  renderStudent(student) {
    if (!student) {
      return null;
    }

    return (
      <Segment
        style={{
          display: 'block',
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
  selectedDrinks: PropTypes.array,
  initCheckoutPage: PropTypes.func.isRequired,
  selectStudent: PropTypes.func.isRequired,
  selectDrink: PropTypes.func.isRequired,
  deselectDrink: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  resetCheckout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectCheckoutPageIsLoading(),
  isCheckoutLoading: makeSelectCheckoutPageIsLoading(),
  recentTransactions: makeSelectCheckoutPageRecentTransactions(),
  recentDrinks: makeSelectCheckoutPageRecentDrinks(),
  selectedStudent: makeSelectCheckoutPageSelectedStudent(),
  selectedDrinks: makeSelectCheckoutPageSelectedDrinks(),
});

function mapDispatchToProps(dispatch) {
  return {
    initCheckoutPage: () => dispatch(initCheckoutPageAction()),
    selectStudent: username => dispatch(selectStudentAction(username)),
    selectDrink: drink => dispatch(selectDrinkAction(drink)),
    deselectDrink: drinkIdx => dispatch(deselectDrinkAction(drinkIdx)),
    checkout: (student, drinks) => dispatch(checkoutAction(student, drinks)),
    resetCheckout: () => dispatch(resetCheckoutAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'checkoutPage', reducer });
const withSaga = injectSaga({ key: 'checkoutPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CheckoutPage);
