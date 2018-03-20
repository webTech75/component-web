import React, { Component } from "react";
import { Row, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default class ConfirmModal extends Component {
  render() {
    return (       
      <Modal show={this.props.show} onHide={this.props.handleHide}
        aria-labelledby="contained-modal-title"
        dialogClassName="modal-container" 
        className={ this.props.className }
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title">
            {this.props.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {this.props.children}
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}