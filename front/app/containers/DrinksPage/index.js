/**
 *
 * DrinksPage
 *
 */

import ContainImage from 'components/ContainImage';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Card, Grid, Header, Loader } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { fetchDrinksAction } from './actions';
import reducer from './reducer';
import { makeSelectDrinks, makeSelectDrinksPageIsLoading } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class DrinksPage extends React.Component {
  componentWillMount() {
    this.props.fetchDrinks();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Boissons</title>
        </Helmet>

        <Grid>
          <Grid.Column floated="left" width={4}>
            <Header as="h2">Boissons</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={4}>
            <Button primary fluid>
              Ajouter une boisson
            </Button>
          </Grid.Column>
        </Grid>

        {this.renderDrinks()}
      </div>
    );
  }

  renderDrinks() {
    const { loading } = this.props;
    if (loading) {
      return <Loader active />;
    }

    return (
      <Card.Group itemsPerRow={4} stackable doubling>
        {this.props.drinks.map(drink => this.renderDrink(drink))}
      </Card.Group>
    );
  }

  renderDrink(drink) {
    return (
      <Card key={drink.id}>
        <ContainImage size={150} src={drink.image_url} />
        <Card.Content>
          <Card.Header>
            {drink.name} ({drink.price} €)
          </Card.Header>
          <Card.Meta>
            Volume : {drink.volume} L / Alcool : {drink.alcohol} °
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

DrinksPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  drinks: PropTypes.array,
  fetchDrinks: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDrinksPageIsLoading(),
  drinks: makeSelectDrinks(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchDrinks: () => dispatch(fetchDrinksAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'drinksPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(DrinksPage);
