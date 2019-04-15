/**
 *
 * ContainImage
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ContainImageWrapper = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

function ContainImage({ size, src }) {
  return (
    <ContainImageWrapper
      style={{
        height: size,
        backgroundImage: src
          ? `url(https://upont.enpc.fr/api/${src.replace(
              'images',
              'thumbnails',
            )})`
          : undefined,
      }}
    />
  );
}

ContainImage.propTypes = {
  // size: PropTypes.oneOf([PropTypes.string(), PropTypes.number()]).isRequired,
  src: PropTypes.string,
};

export default ContainImage;
