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
      soldBeers: {
        labels: [
          'Pinte Kro',
          'Chouffe',
          'Bouteille Cidre',
          'Triple Karmeliet',
          'Delirium Tremens',
          'Bi\u00e8re du Corbeau',
          'Cuv\u00e9e des Trolls',
          'Queue de Charrue Triple',
          'Pinte Grimbergen Blanche',
          'Armand Ter Dolen',
          'Pinte Goudale',
          'Rince Cochon',
          'Kwak',
          'Pinte Grimbergen Triple',
          'Skoll',
          'Saint Bernardus Triple',
          'Pinte Carlsberg',
          'Queue de charrue Ambr\u00e9e',
          'Belgoo Luppo',
          'Saint Feuillien triple',
          'Paix-Dieu',
          'Duvel',
          'Kasteel Blonde',
          'Monaco',
          'Pinte kro sans subvention',
          'Demi Kro',
          'Westmalle Triple',
          'Bi\u00e8res panier',
          'Straffe Quadruple',
          'Tongerlo Prior',
          'Desperados',
          'Goudale 33cL',
          'Kasteel Rouge',
          'Belgoo Arboo (Triple)',
          'Saint Louis Gueuze',
          'Pinte Cidre',
          'Soft',
          'mousseux',
          'La G de Goudale',
          'Parisis Blanche',
          'Carlsberg Elephant',
          'Kerisac 25 cL',
          'Bolossage de trez',
          'Sex-gen performant',
          'Amsterdam Maximator',
          'Grand Chlem',
          'Kro 7.2\u00ba',
          'Pietra',
          'Trappiste Rocheford',
          '8.6 Extreme',
          'Bite de Schmutz',
          'Fl\u00fbte en plastique',
          'Trappe Blonde',
          'Croque',
          'Champagne 75cL',
          'Morto de mes couilles',
          'Trappe quadruple',
          'Rechargement 10\u20ac',
          'Chimay Rouge',
          'Monaco',
          'Chimay',
          'Coca',
        ],
        data: [
          '3738',
          '385',
          '373',
          '303',
          '260',
          '205',
          '136',
          '132',
          '121',
          '117',
          '82',
          '76',
          '73',
          '71',
          '71',
          '68',
          '63',
          '53',
          '53',
          '49',
          '44',
          '44',
          '43',
          '43',
          '39',
          '35',
          '30',
          '26',
          '24',
          '23',
          '23',
          '22',
          '22',
          '21',
          '20',
          '16',
          '13',
          '12',
          '12',
          '10',
          '9',
          '9',
          '8',
          '8',
          '8',
          '7',
          '7',
          '7',
          '6',
          '6',
          '5',
          '3',
          '2',
          '2',
          '2',
          '2',
          '1',
          '1',
          '1',
          '1',
          '1',
          '1',
        ],
      },
    };

    return (
      <div>
        <Helmet>
          <title>Statistiques</title>
        </Helmet>

        <Header>Statistiques</Header>

        <Header as="h4">Équilibres par promo</Header>

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
