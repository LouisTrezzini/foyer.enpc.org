/**
 *
 * Avatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

function Avatar({ size, src }) {
  return (
    <AvatarContainer
      style={{
        height: size,
        backgroundImage: src
          ? `url(https://upont.enpc.fr/api/${src})`
          : undefined,
      }}
    />
  );
}

Avatar.propTypes = {
  // size: PropTypes.oneOf([PropTypes.string(), PropTypes.number()]).isRequired,
  src: PropTypes.string,
};

export default Avatar;
