/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import TopUpPage from 'containers/TopUpPage/Loadable';
import DrinksPage from 'containers/DrinksPage/Loadable';
import StudentPage from 'containers/StudentsPage/Loadable';
import TransactionsPage from 'containers/TransactionsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import GlobalStyle from '../../global-styles';
import AppLayout from '../AppLayout';

const Wrapper = styled.div`
  height: 100%;
`;

export default function App() {
  return (
    <Wrapper>
      <Helmet
        titleTemplate="%s - Foyer des Ponts"
        defaultTitle="Foyer des Ponts"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>

      <Switch>
        <Route path="/">
          <AppLayout>
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route exact path="/top-up" component={TopUpPage} />

              <Route exact path="/drinks" component={DrinksPage} />

              <Route exact path="/transactions" component={TransactionsPage} />
              <Route exact path="/students" component={StudentPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </AppLayout>
        </Route>

        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </Wrapper>
  );
}
