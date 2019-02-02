/**
 *
 * StatisticsPage
 *
 */

import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Header, Loader } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { fetchStatisticsAction } from './actions';
import reducer from './reducer';
import {
  makeSelectStatisticsPageIsLoading,
  makeSelectStatisticsPromoBalances,
  makeSelectStatisticsSoldDrinks,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class StatisticsPage extends React.Component {
  componentWillMount() {
    this.props.fetchStatistics();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Statistiques</title>
        </Helmet>

        <Header as="h2">Statistiques</Header>

        {this.renderStatistics()}
      </div>
    );
  }

  renderStatistics() {
    const { loading, promoBalances, soldDrinks } = this.props;
    if (loading) {
      return <Loader active />;
    }

    return (
      <Fragment>
        <Header as="h4" textAlign="center">
          Équilibres par promo
        </Header>

        <div style={{ height: 500, width: '100%' }}>
          <ResponsiveBar
            data={promoBalances}
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
            data={soldDrinks}
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
      </Fragment>
    );
  }
}

StatisticsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  promoBalances: PropTypes.array.isRequired,
  soldDrinks: PropTypes.array.isRequired,
  fetchStatistics: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectStatisticsPageIsLoading(),
  promoBalances: makeSelectStatisticsPromoBalances(),
  soldDrinks: makeSelectStatisticsSoldDrinks(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStatistics: () => dispatch(fetchStatisticsAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'statisticsPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(StatisticsPage);
