/**
 *
 * DrinkEditPage
 *
 */

import ContainImage from 'components/ContainImage';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Loader,
  Segment,
} from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { fetchDrinkAction } from './actions';
import reducer from './reducer';
import {
  makeSelectDrinkEdit,
  makeSelectDrinkEditPageIsLoading,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class DrinkEditPage extends React.Component {
  state = {};

  componentDidMount() {
    const { drinkId } = this.props.match.params;
    this.props.fetchDrink(drinkId);
  }

  componentWillReceiveProps(nextProps) {
    const { drink } = nextProps;
    if (drink) {
      this.setState({
        name: drink.name,
        price: drink.price,
        volume: drink.volume,
        alcohol: drink.alcohol,
      });
    }
  }

  processValue(name, value) {
    if (name === 'price' || name === 'volume' || name === 'alcohol') {
      return +value;
    }

    return value;
  }

  handleInputChange = (event, { name, value }) => {
    this.setState({ [name]: this.processValue(name, value) });
  };

  handleSubmit = event => {
    const { username, amount } = this.state;
    console.log(this.state);

    // this.props.topUp(username, amount);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Modifier une boisson</title>
        </Helmet>

        <Grid>
          <Grid.Column floated="left" width={6}>
            <Header as="h2">Modifier une boisson</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={4}>
            <Button negative fluid>
              Supprimer
            </Button>
          </Grid.Column>
        </Grid>

        <Divider hidden />

        {this.renderDrinkEditForm()}
      </div>
    );
  }

  renderDrinkEditForm() {
    const { loading } = this.props;
    if (loading) {
      return <Loader active />;
    }

    const { drink } = this.props;
    const { name, price, volume, alcohol } = this.state;

    return (
      <Form size="large" onSubmit={this.handleSubmit}>
        <Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column floated="left" width={12}>
                <Form.Input
                  label="Nom"
                  name="name"
                  onChange={this.handleInputChange}
                  value={name}
                  fluid
                  icon="quote left"
                  iconPosition="left"
                  placeholder="Nom"
                  type="string"
                  required
                />
                <Form.Input
                  label="Prix"
                  name="price"
                  onChange={this.handleInputChange}
                  value={price}
                  fluid
                  icon="euro"
                  iconPosition="left"
                  placeholder="Prix"
                  type="number"
                  step="0.01"
                  required
                />
                <Form.Input
                  label="Volume"
                  name="volume"
                  onChange={this.handleInputChange}
                  value={volume}
                  fluid
                  icon="flask"
                  iconPosition="left"
                  placeholder="Volume"
                  type="number"
                  step="0.01"
                  required
                />
                <Form.Input
                  label="Degré d'alcool"
                  name="alcohol"
                  onChange={this.handleInputChange}
                  value={alcohol}
                  fluid
                  icon="beer"
                  iconPosition="left"
                  placeholder="Degré d'alcool"
                  type="number"
                  step="1"
                  required
                />
              </Grid.Column>
              <Grid.Column floated="right" width={4} verticalAlign="middle">
                <ContainImage size={150} src={drink.image_url} />
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment>
            <Button primary fluid loading={loading}>
              Sauvegarder
            </Button>
          </Segment>
        </Segment.Group>
      </Form>
    );
  }
}

DrinkEditPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  drink: PropTypes.object,
  fetchDrink: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDrinkEditPageIsLoading(),
  drink: makeSelectDrinkEdit(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchDrink: drinkId => dispatch(fetchDrinkAction(drinkId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'drinkEditPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(DrinkEditPage);
