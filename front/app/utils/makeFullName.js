const makeFullName = user =>
  `${user.first_name} ${user.last_name} (${user.promo})`;

export default makeFullName;
