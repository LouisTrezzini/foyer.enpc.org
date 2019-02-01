/**
 *
 * AppLayout
 *
 */

import { logoutAction } from 'containers/App/actions';
import logo from 'images/foyer.jpg';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
} from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppLayout from './selectors';

function AppLayout(props) {
  const { logout } = props;
  return (
    <Fragment>
      <Menu fixed="top" stackable>
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

          <Menu.Item as={Link} to="/statistics">
            <Icon name="chart bar outline" /> Statistiques
          </Menu.Item>

          <Dropdown item simple text="Gestion">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/drinks">
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
              <Dropdown.Item as={Link} to="/students">
                <Icon name="users" />
                Étudiants
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right">
            <Menu.Item>
              <Button onClick={logout}>
                <Icon name="log out" />
                Se déconnecter
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Container style={{ height: '100%', paddingTop: '6em' }}>
        {React.Children.only(props.children)}
      </Container>
    </Fragment>
  );
}

AppLayout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appLayout: makeSelectAppLayout(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
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
