import React from 'react';
import * as RB from 'react-bootstrap';
import FormExample from './custom-form.js'

const Button = RB.Button;
const Modal = RB.Modal;
const ButtonToolbar = RB.ButtonToolbar;
const ControlLabel = RB.ControlLabel;
const FormControl = RB.FormControl;
const FormGroup = RB.FormGroup;
const HelpBlock = RB.HelpBlock;


export default class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount = () => {
        this.setState({ show: false });
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle="success" bsSize="small" onClick={this.showModal}>✙ New</Button>

                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Add new products</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormExample />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                        <Button bsStyle="primary" onClick={this.hideModal}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}
