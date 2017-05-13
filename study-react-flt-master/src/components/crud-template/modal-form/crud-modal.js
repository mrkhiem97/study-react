import React from 'react';
import { ButtonToolbar, Button, Modal, Glyphicon } from 'react-bootstrap';
import FormCRUDJourney from '../form/FormCRUDJourney';
import moment from 'moment';

/* Create journey modal box */
export class CreateJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.defaultJourney = {
            id: 0,
            journeyName: '',
            estimateStartTime: moment().valueOf(),
            estimateEndTime: moment().valueOf(),
        };

        this.journey = {};
        Object.assign(this.journey, this.defaultJourney);

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
        // Clear journey
        Object.assign(this.journey, this.defaultJourney);
        this.setState({
            show: false,
        });
    }

    handleAddAction = () => {
        // Do validate again
        // Trigger valiadte on each child component when click save button
        if (!this.formNode.doValidate()) {
            console.log(`Not validated`);
            return;
        }

        // Get journey
        this.journey = this.formNode.getEntity();
        // Add Journey
        this.props.handleAddAction(this.journey);

        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle='success' bsSize='small' onClick={this.showModal}>
                    <Glyphicon glyph="glyphicon glyphicon-plus" />
                    New Journey
                </Button>

                <Modal {...this.props} bsSize='large' show={this.state.show} onHide={this.hideModal} dialogClassName='custom-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg'>Add new Journeys</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormCRUDJourney
                            ref={thisNode => { this.formNode = thisNode }}
                            entity={this.journey}
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

/* Delete journey modal box */
export class DeleteJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.entity = {};
        Object.assign(this.entity, this.props.entity);

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

    handleDeleteAction = () => {
        // const product = .....
        this.props.handleDeleteAction(this.props.entity);
        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle='danger' bsSize='xsmall' onClick={this.showModal}>Delete</Button>

                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName='custom-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg'>Delete this journey?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle='danger' onClick={this.handleDeleteAction}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}

/* Edit journey modal box */
export class EditJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.entity = {};
        Object.assign(this.entity, this.props.entity);

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

    handleEditAction = () => {
        // Do validate again
        // Trigger valiadte on each child component when click save button
        if (!this.formNode.doValidate()) {
            console.log(`Not validated`);
            return;
        }

        // Get journey
        this.entity = this.formNode.getEntity();
        // Edit Journey
        this.props.handleEditAction(this.entity);

        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle='warning' bsSize='xsmall' onClick={this.showModal}>Edit</Button>

                <Modal {...this.props} bsSize='large' show={this.state.show} onHide={this.hideModal} dialogClassName='custom-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg'>Edit journey</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormCRUDJourney
                            ref={thisNode => { this.formNode = thisNode }}
                            entity={this.entity}
                            action='update' />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle='primary' onClick={this.handleEditAction}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}

/* View journey modal box */
export class ViewJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.entity = {};
        Object.assign(this.entity, this.props.entity);

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
                <Button bsStyle='info' bsSize='xsmall' onClick={this.showModal}>Detail</Button>

                <Modal {...this.props} bsSize='large' show={this.state.show} onHide={this.hideModal} dialogClassName='custom-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-lg'>Journey detail</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormCRUDJourney
                            ref={thisNode => { this.formNode = thisNode }}
                            entity={this.entity}
                            action='read' />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}