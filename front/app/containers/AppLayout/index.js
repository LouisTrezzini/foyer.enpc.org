/**
 *
 * AppLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
} from 'semantic-ui-react';
import logo from 'images/foyer.jpg';
import { Link } from 'react-router-dom';
import makeSelectAppLayout from './selectors';
import reducer from './reducer';
import saga from './saga';

function AppLayout(props) {
  return (
    <div>
      <Menu fixed="top">
        <Container>
          <Menu.Item as={Link} header to="/">
            <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
            Foyer
          </Menu.Item>

          <Menu.Item as={Link} to="/billing">
            <Icon name="shop" /> Encaissement
          </Menu.Item>

          <Menu.Item as={Link} to="/top-up">
            <Icon name="credit card outline" /> Rechargement
          </Menu.Item>

          <Dropdown item simple text="Gestion">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/beers">
                <Icon name="beer" />
                Boissons
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/transactions">
                <Icon name="dollar" />
                Transactions
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/debts">
                <Icon name="money bill alternate outline" />
                Dettes
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/users">
                <Icon name="users" />
                Étudiants
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item simple text="Statistiques">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/stats/balance">
                <Icon name="balance" />
                Balances
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right">
            <Menu.Item as={Button}>
              <Icon name="log out" />
              Se déconnecter
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Container style={{ paddingTop: '6em' }}>
        {React.Children.only(props.children)}
      </Container>
    </div>
  );
}

AppLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appLayout: makeSelectAppLayout(),
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

const withReducer = injectReducer({ key: 'appLayout', reducer });
const withSaga = injectSaga({ key: 'appLayout', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppLayout);
