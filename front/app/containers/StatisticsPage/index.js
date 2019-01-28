/**
 *
 * StatisticsPage
 *
 */

import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Header } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectStatisticsPage from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class StatisticsPage extends React.Component {
  render() {
    const statistics = {
      promoBalances: [
        {
          promo: '',
          balance: 235.69,
        },
        // {
        //   promo: '',
        //   balance: 43.49,
        // },
        {
          promo: '014',
          balance: -18.8,
        },
        {
          promo: '015',
          balance: -281,
        },
        {
          promo: '016',
          balance: -367.32,
        },
        {
          promo: '017',
          balance: -155.79,
        },
        {
          promo: '018',
          balance: -53.02,
        },
        {
          promo: '019',
          balance: 294.62,
        },
        {
          promo: '020',
          balance: 1107.25,
        },
        {
          promo: '021',
          balance: 1194.6,
        },
      ],
      soldBeers: [
        { drink: 'Pinte Kro', count: 3738 },
        { drink: 'Chouffe', count: 385 },
        { drink: 'Bouteille Cidre', count: 373 },
        { drink: 'Triple Karmeliet', count: 303 },
        { drink: 'Delirium Tremens', count: 260 },
        { drink: 'Bière du Corbeau', count: 205 },
        { drink: 'Cuvée des Trolls', count: 136 },
        { drink: 'Queue de Charrue Triple', count: 132 },
        { drink: 'Pinte Grimbergen Blanche', count: 121 },
        { drink: 'Armand Ter Dolen', count: 117 },
        { drink: 'Pinte Goudale', count: 82 },
        { drink: 'Rince Cochon', count: 76 },
        { drink: 'Kwak', count: 73 },
        { drink: 'Pinte Grimbergen Triple', count: 71 },
        { drink: 'Skoll', count: 71 },
        { drink: 'Saint Bernardus Triple', count: 68 },
        { drink: 'Pinte Carlsberg', count: 63 },
        { drink: 'Queue de charrue Ambrée', count: 53 },
        { drink: 'Belgoo Luppo', count: 53 },
        { drink: 'Saint Feuillien triple', count: 49 },
        { drink: 'Paix-Dieu', count: 44 },
        { drink: 'Duvel', count: 44 },
        { drink: 'Kasteel Blonde', count: 43 },
        { drink: 'Monaco', count: 43 },
        { drink: 'Pinte kro sans subvention', count: 39 },
        { drink: 'Demi Kro', count: 35 },
        { drink: 'Westmalle Triple', count: 30 },
        { drink: 'Bières panier', count: 26 },
        { drink: 'Straffe Quadruple', count: 24 },
        { drink: 'Tongerlo Prior', count: 23 },
        { drink: 'Desperados', count: 23 },
        { drink: 'Goudale 33cL', count: 22 },
        { drink: 'Kasteel Rouge', count: 22 },
        { drink: 'Belgoo Arboo (Triple)', count: 21 },
        { drink: 'Saint Louis Gueuze', count: 20 },
        { drink: 'Pinte Cidre', count: 16 },
        { drink: 'Soft', count: 13 },
        { drink: 'mousseux', count: 12 },
        { drink: 'La G de Goudale', count: 12 },
        { drink: 'Parisis Blanche', count: 10 },
        { drink: 'Carlsberg Elephant', count: 9 },
        { drink: 'Kerisac 25 cL', count: 9 },
        { drink: 'Bolossage de trez', count: 8 },
        { drink: 'Sex-gen performant', count: 8 },
        { drink: 'Amsterdam Maximator', count: 8 },
        { drink: 'Grand Chlem', count: 7 },
        { drink: 'Kro 7.2º', count: 7 },
        { drink: 'Pietra', count: 7 },
        { drink: 'Trappiste Rocheford', count: 6 },
        { drink: '8.6 Extreme', count: 6 },
        { drink: 'Bite de Schmutz', count: 5 },
        { drink: 'Flûte en plastique', count: 3 },
        { drink: 'Trappe Blonde', count: 2 },
        { drink: 'Croque', count: 2 },
        { drink: 'Champagne 75cL', count: 2 },
        { drink: 'Morto de mes couilles', count: 2 },
        { drink: 'Trappe quadruple', count: 1 },
        { drink: 'Rechargement 10€', count: 1 },
        { drink: 'Chimay Rouge', count: 1 },
        { drink: 'Monaco', count: 1 },
        { drink: 'Chimay', count: 1 },
        { drink: 'Coca', count: 1 },
      ],
    };

    return (
      <div>
        <Helmet>
          <title>Statistiques</title>
        </Helmet>

        <Header as="h2">Statistiques</Header>

        <Header as="h4" textAlign="center">
          Équilibres par promo
        </Header>

        <div style={{ height: 500, width: '100%' }}>
          <ResponsiveBar
            data={statistics.promoBalances}
            indexBy="promo"
            keys={['', 'balance']}
            axisBottom={{
              legend: 'Promo',
              legendPosition: 'middle',
              legendOffset: 45,
            }}
            axisLeft={{
              legend: 'Équilibre',
              legendPosition: 'middle',
              legendOffset: -45,
            }}
            margin={{
              top: 0,
              right: 0,
              bottom: 50,
              left: 50,
            }}
            padding={0.3}
          />
        </div>

        <Header as="h4" textAlign="center">
          Boissons vendues
        </Header>

        <div style={{ height: 500, width: '100%' }}>
          <ResponsiveBar
            data={statistics.soldBeers}
            indexBy="drink"
            keys={['count']}
            axisBottom={{
              legend: 'Boisson',
              legendPosition: 'middle',
              legendOffset: 45,
            }}
            axisLeft={{
              legend: 'Quantité',
              legendPosition: 'middle',
              legendOffset: -45,
            }}
            margin={{
              top: 0,
              right: 0,
              bottom: 50,
              left: 50,
            }}
            padding={0.3}
          />
        </div>
      </div>
    );
  }
}

StatisticsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statisticsPage: makeSelectStatisticsPage(),
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

const withReducer = injectReducer({ key: 'statisticsPage', reducer });
const withSaga = injectSaga({ key: 'statisticsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StatisticsPage);
