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
import TransactionsPage from 'containers/TransactionsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Helmet } from 'react-helmet';
import GlobalStyle from '../../global-styles';
import AppLayout from '../AppLayout';

export default function App() {
  return (
    <div>
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
              <Route exact path="/transactions" component={TransactionsPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </AppLayout>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
