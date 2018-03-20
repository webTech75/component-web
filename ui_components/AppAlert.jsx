import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ControlLabel } from 'react-bootstrap';

export default class AppAlert extends Component {
  static defaultProps = {
    className: ""
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string, 
  }
  render() {
    return (
      <div className={`app-alert ${this.props.status} ${this.props.className}`}>
        <Row>
          <Col md={10}>
            {
              this.props.title ?
                <ControlLabel
                  className={`alert ${this.props.status}`}
                >
                  { this.props.title }
                </ControlLabel>
              : ''
            }
            {
              this.props.description ?
                <p dangerouslySetInnerHTML={{ __html: this.props.description }} />
              : ''
            }
          </Col>
          <Col md={2} className={`float-right ${this.props.icon}`} />
        </Row>
        <Row>
          {this.props.children}
        </Row>
      </div>
    );
  }
}
