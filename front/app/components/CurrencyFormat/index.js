/**
 *
 * CurrencyFormat
 *
 */

import React from 'react';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

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
