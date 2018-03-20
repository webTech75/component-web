import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, Alert } from 'react-bootstrap';

class AppFixedAlert extends Component {
  static propTypes = {
    alertText: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className="app-fixed-alert-wrapper">
        {
          this.props.alertText ?
            <ControlLabel className="label-info">{ this.props.alertText }</ControlLabel>
          : ''
        }
        {
          this.props.helpText ?
            <Alert bsStyle="info">{ this.props.helpText }</Alert>
          : ''
        }
      </div>
    );
  }
}

module.exports = AppFixedAlert;

