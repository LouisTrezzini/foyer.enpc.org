/**
 *
 * StudentsPage
 *
 */

import Avatar from 'components/Avatar';
import CurrencyFormat from 'components/CurrencyFormat';
import TransactionsTable from 'components/TransactionsTable';
import UserSearchDropdown from 'containers/UserSearchDropdown';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Header, Icon, Image, Item } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeFullName from 'utils/makeFullName';
import makeSelectStudentPage from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class StudentsPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Profil étudiant</title>
        </Helmet>

        <Header>Consulter le profil d'un étudiant</Header>

        <UserSearchDropdown fluid placeholder="Étudiant" />

        {this.renderStudent()}
      </div>
    );
  }

  renderStudent() {
    // const { student } = this.props;
    const student = {
      username: 'gabriel.plantier',
      email: 'gabriel.plantier@eleves.enpc.fr',
      image_url: 'uploads/images/3458.jpeg',
      nick: 'Gabriel Plantier',
      first_name: 'Gabriel',
      last_name: 'Plantier',
      gender: 'M',
      promo: '019',
      department: 'SEGF',
      origin: 'Concours Commun',
      nationality: 'France',
      location: 'meunier',
      phone: '0603861699',
      tour: true,
      stats_foyer: true,
      stats_ponthub: true,
      stats_facegame: true,
      balance: -25.29,
      mail_event: true,
      mail_modification: true,
      mail_shotgun: true,
    };

    if (!student) {
      return null;
    }

    return (
      <Fragment>
        <Card centered>
          <Avatar size={150} src={student.image_url} />
          <Card.Content>
            <Card.Header>{makeFullName(student)}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Icon name="money bill alternate outline" />
            Solde : <CurrencyFormat value={student.balance} />
          </Card.Content>
        </Card>

        <Header>Historique des transactions</Header>

        <TransactionsTable transactions={[]} />
      </Fragment>
    );
  }
}

StudentsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentPage: makeSelectStudentPage(),
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

const withReducer = injectReducer({ key: 'studentPage', reducer });
const withSaga = injectSaga({ key: 'studentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentsPage);
