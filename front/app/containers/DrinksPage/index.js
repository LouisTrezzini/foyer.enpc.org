/**
 *
 * DrinksPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Card, Grid, Header } from 'semantic-ui-react';
import Avatar from 'components/Avatar';
import { makeSelectDrinks } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class DrinksPage extends React.Component {
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

        <Card.Group itemsPerRow={4} stackable doubling>
          {this.props.drinks.map(drink => this.renderDrink(drink))}
        </Card.Group>
      </div>
    );
  }

  renderDrink(drink) {
    return (
      <Card key={drink.id}>
        <Avatar size={150} src={drink.image_url} />
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
  drinks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  drinks: makeSelectDrinks(),
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

const withReducer = injectReducer({ key: 'drinksPage', reducer });
const withSaga = injectSaga({ key: 'drinksPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DrinksPage);
