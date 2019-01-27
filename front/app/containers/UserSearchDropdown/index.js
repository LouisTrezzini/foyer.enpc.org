/**
 *
 * UserSearchDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Form } from 'semantic-ui-react';
import makeSelectUserSearchDropdown from './selectors';
import reducer from './reducer';
import saga from './saga';

function makeOptionsFromUsers(users) {
  return users.map(user => ({
    key: user.username,
    text: `${user.firstName} ${user.lastName} (${user.promo})`,
    value: user.username,
  }));
}

/* eslint-disable react/prefer-stateless-function */
export class UserSearchDropdown extends React.Component {
  state = {
    isFetching: false,
    searchQuery: null,
    users: [],
    options: [],
  };

  fetchOptions = () => {
    this.setState({ isFetching: true });

    const users = [
      {
        username: 'louist',
        firstName: 'Louis',
        lastName: 'Trezzini',
        promo: '018',
      },
    ];

    setTimeout(() => {
      this.setState({
        isFetching: false,
        options: makeOptionsFromUsers(users),
        users,
      });
    }, 500);
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery });
    this.fetchOptions();
  };

  render() {
    const { options, isFetching } = this.state;

    return (
      <Form.Dropdown
        fluid={this.props.fluid}
        selection
        search
        // icon="user"
        // iconPosition="left"
        placeholder="Étudiant"
        options={options}
        value={this.props.value}
        onChange={this.props.handleChange}
        onSearchChange={this.handleSearchChange}
        disabled={isFetching}
        loading={isFetching}
        noResultsMessage="Pas de résultats."
      />
    );
  }
}

UserSearchDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userSearchDropdown: makeSelectUserSearchDropdown(),
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

const withReducer = injectReducer({ key: 'userSearchDropdown', reducer });
const withSaga = injectSaga({ key: 'userSearchDropdown', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserSearchDropdown);
