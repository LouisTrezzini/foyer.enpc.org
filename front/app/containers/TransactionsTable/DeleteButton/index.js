/**
 *
 * DeleteButton
 *
 */

import { DELETE_TRANSACTION } from 'containers/TransactionsTable/constants';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { formatBeerName, formatDate, formatFullName } from 'utils/formatters';
import { pending } from 'utils/reduxThunkSelectors';

/* eslint-disable react/prefer-stateless-function */
export class DeleteButton extends React.Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit = () => {
    const { transaction } = this.props;

    this.props.deleteTransaction(transaction);
  };

  render() {
    const { transaction } = this.props;
    return (
      <Modal
        trigger={this.renderButton()}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="trash" content="Supprimer la transaction" />
        <Modal.Content>
          <p>Es-tu certain de vouloir supprimer la transaction ?</p>

          <ul>
            <li>Étudiant : {formatFullName(transaction.user)}</li>
            <li>Date : {formatDate(transaction.date)} </li>
            <li>Boisson : {formatBeerName(transaction.beer)}</li>
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            <Icon name="cancel" /> Annuler
          </Button>
          <Button color="red" onClick={this.handleSubmit}>
            <Icon name="trash" /> Supprimer
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderButton() {
    const { loading } = this.props;
    return (
      <Button
        icon="trash"
        negative
        loading={loading}
        onClick={this.handleOpen}
      />
    );
  }
}

DeleteButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  transaction: PropTypes.object.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loading: pending(state, DELETE_TRANSACTION, ownProps.transaction.id),
  };
}

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(DeleteButton);
