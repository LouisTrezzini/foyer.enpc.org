/**
 *
 * HoverDimmer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Dimmer } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class HoverDimmer extends React.Component {
  state = {
    active: false,
  };

  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const { dimmerContent, dimmedContent } = this.props;
    return (
      <Dimmer.Dimmable
        dimmed={active}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
      >
        {dimmedContent}

        <Dimmer active={active}>{dimmerContent}</Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

HoverDimmer.propTypes = {
  dimmerContent: PropTypes.node.isRequired,
  dimmedContent: PropTypes.node.isRequired,
};

export default HoverDimmer;
