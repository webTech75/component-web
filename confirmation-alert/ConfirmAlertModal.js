import React, { Component } from "react";
import { Grid, Row, Col, Modal, Button } from "react-bootstrap";
import "./ConfirmAlertModal.less";

class ConfirmAlertModal extends Component {
    render() {
        return (
            <Modal id={ this.props.modalID } className="confirm-alert-modal transparent-modal" show={ this.props.show } onHide = { this.props.onHide }>
                <Modal.Header closeButton>
                     <h2> Confirmation </h2>
                </Modal.Header>
                <Modal.Body>
                        <Row>
                            { this.props.message }
                        </Row>
                        <Row>
                            {
                                this.props.actions.map(( eachAction,index )=>{
                                    return (
                                        <Col key={ index } md={12/( this.props.actions.length ? this.props.actions.length : 1 )}>
                                            <Button bsStyle={ eachAction.className } name={ eachAction.label } onClick={ eachAction.action }>{ eachAction.label }</Button>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                </Modal.Body>
            </Modal>
        );
    }
}


module.exports = ConfirmAlertModal;
