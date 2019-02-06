/**
 *
 * DeleteTransactionButton
 *
 */

import { deleteTransactionAction } from 'containers/DeleteTransactionButton/actions';
import { DELETE_TRANSACTION } from 'containers/DeleteTransactionButton/constants';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { pending } from 'utils/reduxThunkSelectors';

/* eslint-disable react/prefer-stateless-function */
export class DeleteTransactionButton extends React.Component {
  handleClick = () => {
    const { transaction } = this.props;

    this.props.deleteTransaction(transaction).then(() => {
      if (this.props.onDelete) {
        this.props.onDelete(transaction);
      }
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <Button
        icon="delete"
        negative
        loading={loading}
        onClick={this.handleClick}
      />
    );
  }
}

DeleteTransactionButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  transaction: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  deleteTransaction: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loading: pending(state, DELETE_TRANSACTION, ownProps.transaction.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTransaction: transaction =>
      dispatch(deleteTransactionAction(transaction)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DeleteTransactionButton);
