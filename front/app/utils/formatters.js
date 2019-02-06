import moment from 'moment';

export const formatFullName = user =>
  `${user.first_name} ${user.last_name} (${user.promo})`;

export const formatBeerName = beer => (beer ? beer.name : 'Rechargement');

export const formatDate = date => moment(date * 1000).format('lll');
