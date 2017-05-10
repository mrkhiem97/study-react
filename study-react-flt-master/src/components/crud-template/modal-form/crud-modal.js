import React from 'react';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js';
import FormCRUDJourney from '../form/FormCRUDJourney';

import { Button, Modal, ButtonToolbar } from 'react-bootstrap';

const createFormOption = (id, journeyName, estimateStartTime, estimateEndTime) => {
    // JourneyId
    const dataJourneyId = {
        controlId: 'controlJourneyId',
        label: 'Journey Id',
        value: id,
        validateStatus: {},
    };
    const optionJourneyId = {
        validator: BSTValidatorHelper.validatateJourneyId,
    };

    // JourneyName
    const dataJourneyName = {
        controlId: 'controlJourneyName',
        label: 'Journey Name',
        value: journeyName,
        validateStatus: {},
    }
    const optionJourneyName = {
        validator: BSTValidatorHelper.validatateJourneyName,
    }

    // Journey Estimate Start time
    const dataJourneyEstimateStartTime = {
        controlId: 'controlJourneyEstimateStartTime',
        label: 'Estimate start time',
        value: estimateStartTime,
        validateStatus: {},
    };
    const optionJourneyEstimateStartTime = {
        validator: BSTValidatorHelper.validatateJourneyPrice,
    }

    // Journey Estimate End time
    const dataJourneyEstimateEndTime = {
        controlId: 'controlJourneyEstimateEndTime',
        label: 'Estimate end time',
        value: estimateEndTime,
        validateStatus: {},
    };
    const optionJourneyEstimateEndTime = {
        validator: BSTValidatorHelper.validatateJourneyPrice,
    }

    const formOption = {
        id: { data: dataJourneyId, option: optionJourneyId },
        journeyName: { data: dataJourneyName, option: optionJourneyName },
        estimateStartTime: { data: dataJourneyEstimateStartTime, option: optionJourneyEstimateStartTime },
        estimateEndTime: { data: dataJourneyEstimateEndTime, option: optionJourneyEstimateEndTime },
    };
    return formOption;
}

/* Create journey modal box */
export class CreateJourneyModal extends React.Component {
    constructor(props) {
        super(props);

        this.defaultJourneyData = {
            id: '',
            journeyName: '',
            estimateStartTime: '',
            estimateEndTime: ''
        };

        this.state = {
            show: false,
            journey: this.defaultJourneyData
        };

        this.formOption = createFormOption(this.state.journey.id, this.state.journey.journeyName, this.state.journey.estimateStartTime, this.state.journey.estimateEndTime);
    }

    componentDidMount = () => {
        const journey = {};
        Object.assign(journey, this.defaultJourneyData);
        this.setState({
            show: false,
            journey: journey
        });
    }

    showModal = () => {
        const journey = {};
        Object.assign(journey, this.defaultJourneyData);
        this.setState({
            show: true,
            journey: journey
        });
    }

    hideModal = () => {
        const journey = {};

        // Reset form input value when closed
        for (const field in this.formOption) {
            this.formOption[field].data.value = '';
        }

        Object.assign(journey, this.defaultJourneyData);
        this.setState({
            show: false,
            journey: journey
        });
    }

    handleAddAction = () => {
        // Do validate again
        // Trigger valiadte on each child component when click save button
        if (!this.formNode.doValidate()) {
            return;
        }


        const journey = {};
        // If there is one input field not validated, save action will be aborted

        for (const field in this.formOption) {
            journey[field] = this.formOption[field].data.value;
        }

        // Add Journey
        this.props.handleAddAction(journey);
        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle="success" bsSize="small" onClick={this.showModal}>✙ New Journey</Button>

                <Modal {...this.props} bsSize="large" show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Add new Journeys</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormCRUDJourney ref={thisNode => { this.formNode = thisNode }} journey={this.state.journey} formOption={this.formOption} action="create" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.handleAddAction}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}
