import React from 'react';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js';
import FormCRUDJourney from '../form/FormCRUDJourney';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';

/* Create journey modal box */
export class CreateJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.journey = {
            id: '',
            journeyName: '',
            estimateStartTime: `${moment().valueOf()}`,
            estimateEndTime: `${moment().valueOf()}`,
        };

        this.state = {
            show: false,
        };
    }

    componentDidMount = () => {
        this.setState({
            show: false,
        });
    }

    showModal = () => {
        this.setState({
            show: true,
        });
    }

    hideModal = () => {
        this.setState({
            show: false,
        });
    }

    handleAddAction = () => {
        // Do validate again
        // Trigger valiadte on each child component when click save button
        if (!this.formNode.doValidate()) {
            return;
        }

        // Add Journey
        this.props.handleAddAction(this.journey);
        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle='success' bsSize='small' onClick={this.showModal}>✙ New Journey</Button>

                <Modal {...this.props} bsSize='large' show={this.state.show} onHide={this.hideModal} dialogClassName='custom-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg'>Add new Journeys</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormCRUDJourney
                            ref={thisNode => { this.formNode = thisNode }}
                            journey={this.journey}
                            action='create' />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle='primary' onClick={this.handleAddAction}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}
