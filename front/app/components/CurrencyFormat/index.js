/**
 *
 * CurrencyFormat
 *
 */

import React from 'react';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function CurrencyFormat({ value }) {
  return (
    <NumberFormat
      decimalScale={2}
      fixedDecimalScale
      suffix=" €"
      value={value}
      displayType="text"
    />
  );
}

CurrencyFormat.propTypes = { value: PropTypes.number.isRequired };

export default CurrencyFormat;
