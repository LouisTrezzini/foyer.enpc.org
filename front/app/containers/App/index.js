/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import DrinksPage from 'containers/DrinksPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'containers/PrivateRoute';
import StatisticsPage from 'containers/StatisticsPage/Loadable';
import StudentPage from 'containers/StudentsPage/Loadable';
import TopUpPage from 'containers/TopUpPage/Loadable';
import TransactionsPage from 'containers/TransactionsPage/Loadable';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import styled from 'styled-components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import GlobalStyle from '../../global-styles';
import AppLayout from '../AppLayout';
import reducer from './reducer';
import saga from './saga';

const Wrapper = styled.div`
  height: 100%;
`;

const App = () => (
  <Wrapper>
    <Helmet titleTemplate="%s - Foyer des Ponts" defaultTitle="Foyer des Ponts">
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>

    <Switch>
      <Route exact path="/login" component={LoginPage} />

      <PrivateRoute path="/">
        <AppLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route exact path="/top-up" component={TopUpPage} />
            <Route exact path="/drinks" component={DrinksPage} />
            <Route exact path="/statistics" component={StatisticsPage} />

            <Route exact path="/transactions" component={TransactionsPage} />
            <Route exact path="/students" component={StudentPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AppLayout>
      </PrivateRoute>

      <Route component={NotFoundPage} />
    </Switch>

    <GlobalStyle />
  </Wrapper>
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
