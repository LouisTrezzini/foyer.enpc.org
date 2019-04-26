/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import { Grid, Header } from 'semantic-ui-react';

export default function NotFound() {
  return (
    <div style={{ height: '100%' }}>
      <Helmet>
        <title>Page non trouvée</title>
      </Helmet>

      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center">
            Page non trouvée
          </Header>
        </Grid.Column>
      </Grid>
    </div>
  );
}
