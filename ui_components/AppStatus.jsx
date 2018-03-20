import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ControlLabel } from 'react-bootstrap';

export default class AppStatus extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    subText: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="app-status-wrapper">
        <Col md={5} className="text-align-right">
          <ControlLabel>Status: </ControlLabel>
        </Col>
        <Col md={7} className="float-right">
          <div className="app-status">
            <Col md={3}>
              <img className={this.props.icon} />
            </Col>
            <Col md={9}>
              <p>{this.props.status}</p>
              <span>{this.props.subText}</span>
            </Col>
          </div>
        </Col>
      </div>
    );
  }
}
