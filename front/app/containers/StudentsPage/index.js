/**
 *
 * StudentsPage
 *
 */

import ContainImage from 'components/ContainImage';
import CurrencyFormat from 'components/CurrencyFormat';
import { push } from 'connected-react-router';
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
import { fetchStudentAction, resetStudentAction } from './actions';
import reducer from './reducer';
import {
  makeSelectStudentPageIsLoading,
  makeSelectStudentPageStudent,
  makeSelectStudentPageTransactions,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class StudentsPage extends React.Component {
  componentDidMount() {
    const { username } = this.props.match.params;

    if (username) {
      this.props.fetchStudent(username);
    } else {
      this.props.resetStudent();
    }
  }

  componentDidUpdate(prevProps) {
    const { username: prevUsername } = prevProps.match.params;
    const { username } = this.props.match.params;

    if (username === prevUsername) {
      return;
    }

    if (username) {
      this.props.fetchStudent(username);
    } else {
      this.props.resetStudent();
    }
  }

  handleStudentChange = (e, { value: username }) => {
    this.props.switchStudent(username);
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
  match: PropTypes.object,
  student: PropTypes.object,
  transactions: PropTypes.object,
  switchStudent: PropTypes.func.isRequired,
  fetchStudent: PropTypes.func.isRequired,
  resetStudent: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectStudentPageIsLoading(),
  student: makeSelectStudentPageStudent(),
  transactions: makeSelectStudentPageTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    switchStudent: username => dispatch(push(`/students/${username}`)),
    fetchStudent: username => dispatch(fetchStudentAction(username)),
    resetStudent: () => dispatch(resetStudentAction()),
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
