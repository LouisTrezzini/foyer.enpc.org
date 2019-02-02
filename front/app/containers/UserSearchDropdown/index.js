/**
 *
 * UserSearchDropdown
 *
 */

import { searchUserAction } from 'containers/UserSearchDropdown/actions';
import {
  makeSelectUserSearchDropdownIsLoading,
  makeSelectUserSearchDropdownResults,
} from 'containers/UserSearchDropdown/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

function makeOptionsFromUsers(users) {
  return users.map(user => ({
    key: user.slug,
    text: `${user.name} (${user.promo})`,
    value: user.slug,
  }));
}

/* eslint-disable react/prefer-stateless-function */
export class UserSearchDropdown extends React.Component {
  handleSearchChange = (e, { searchQuery }) => {
    this.props.searchUser(searchQuery);
  };

  render() {
    const { fluid, name, value, onChange, loading, users } = this.props;

    return (
      <Form.Dropdown
        name={name}
        onChange={onChange}
        value={value}
        fluid={fluid}
        selection
        search
        // icon="user"
        // iconPosition="left"
        placeholder="Étudiant"
        options={makeOptionsFromUsers(users)}
        onSearchChange={this.handleSearchChange}
        loading={loading}
        noResultsMessage="Pas de résultats."
      />
    );
  }
}

UserSearchDropdown.propTypes = {
  fluid: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,

  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUserSearchDropdownResults(),
  loading: makeSelectUserSearchDropdownIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchUser: query => dispatch(searchUserAction(query)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userSearchDropdown', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserSearchDropdown);
