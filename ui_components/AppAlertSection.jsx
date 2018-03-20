import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ControlLabel } from 'react-bootstrap';

export default class AppAlertSection extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  render() {
    return (
      <Row className="app-alerts-wrapper">
        <div className="fixed-width">
        {
          React.Children.map(this.props.children, (key, child) => {
            return (
              <Col md={6}>
                {key}
              </Col>
            );
          })
        }
        </div>
      </Row>
    );
  }
}
