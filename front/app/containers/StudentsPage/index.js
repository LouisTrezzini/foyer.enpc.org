/**
 *
 * StudentsPage
 *
 */

import ContainImage from 'components/ContainImage';
import CurrencyFormat from 'components/CurrencyFormat';
import TransactionsTable from 'containers/TransactionsTable';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, Header, Icon, Loader } from 'semantic-ui-react';
import { formatFullName } from 'utils/formatters';
import injectReducer from 'utils/injectReducer';
import { fetchStudentAction } from './actions';
import reducer from './reducer';
import {
  makeSelectStudentPageIsLoading,
  makeSelectStudentPageStudent,
  makeSelectStudentPageTransactions,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class StudentsPage extends React.Component {
  handleStudentChange = (e, { value: username }) => {
    this.props.fetchStudent(username);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Profil étudiant</title>
        </Helmet>

        <Header as="h2">Consulter le profil d'un étudiant</Header>

        <UserSearchDropdown
          onChange={this.handleStudentChange}
          fluid
          placeholder="Étudiant"
        />

        {this.renderStudent()}
      </div>
    );
  }

  renderStudent() {
    const { loading } = this.props;
    if (loading) {
      return <Loader active />;
    }

    const { student } = this.props;
    if (!student) {
      return null;
    }

    const { transactions } = this.props;

    return (
      <Fragment>
        <Card centered>
          <ContainImage size={150} src={student.image_url} />
          <Card.Content>
            <Card.Header>{formatFullName(student)}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Icon name="money bill alternate outline" />
            Solde : <CurrencyFormat value={student.balance} />
          </Card.Content>
        </Card>

        <Header>Historique des transactions</Header>

        <TransactionsTable transactions={transactions} />
      </Fragment>
    );
  }
}

StudentsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  student: PropTypes.object,
  transactions: PropTypes.object,
  fetchStudent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectStudentPageIsLoading(),
  student: makeSelectStudentPageStudent(),
  transactions: makeSelectStudentPageTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudent: username => dispatch(fetchStudentAction(username)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'studentPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(StudentsPage);
