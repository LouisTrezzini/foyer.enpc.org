import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the drinksPage state domain
 */

const selectDrinksPageDomain = state => state.get('drinksPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectDrinks = () =>
  createSelector(selectDrinksPageDomain, substate =>
    substate.get('drinks').toJS(),
  );

/**
 * Default selector used by DrinksPage
 */

const makeSelectDrinksPage = () =>
  createSelector(selectDrinksPageDomain, substate => substate.toJS());

export default makeSelectDrinksPage;
export { selectDrinksPageDomain, makeSelectDrinks };
