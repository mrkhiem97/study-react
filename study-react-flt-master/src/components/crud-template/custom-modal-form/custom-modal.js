import React from 'react';
import * as RB from 'react-bootstrap';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js';
import ProductFormModal from './custom-form.js';
import FormCRUDJourney from '../form/FormCRUDJourney';

const Button = RB.Button;
const Modal = RB.Modal;
const ButtonToolbar = RB.ButtonToolbar;

var createFormOption1 = (id, journeyName, estimateStartTime, estimateEndTime) => {
    // JourneyId
    const dataJourneyId = {
        controlId: 'controlJourneyId',
        controlType: 'text',
        label: 'Journey Id',
        field: 'id',
        value: id,
        isValid: true,
        isDisable: false
    };
    const optionJourneyId = {
        validator: BSTValidatorHelper.validatateJourneyId,
    };

    // JourneyName
    const dataJourneyName = {
        controlId: 'controlJourneyName',
        label: 'Journey Name',
        field: 'journeyName',
        value: journeyName,
        validateStatus: {},
        isValid: true,
        isDisable: false
    }
    const optionJourneyName = {
        validator: BSTValidatorHelper.validatateJourneyName,
    }

    // Journey Estimate Start time
    const dataJourneyEstimateStartTime = {
        controlId: 'controlJourneyEstimateStartTime',
        label: 'Estimate start time',
        field: 'estimateStartTime',
        value: estimateStartTime,
        validateStatus: {},
        isValid: true,
        isDisable: false
    };
    const optionJourneyEstimateStartTime = {
        validator: BSTValidatorHelper.validatateJourneyPrice,
    }

    // Journey Estimate End time
    const dataJourneyEstimateEndTime = {
        controlId: 'controlJourneyEstimateEndTime',
        label: 'Estimate end time',
        field: 'estimateEndTime',
        value: estimateEndTime,
        validateStatus: {},
        isValid: true,
        isDisable: false
    };
    const optionJourneyEstimateEndTime = {
        validator: BSTValidatorHelper.validatateJourneyPrice,
    }

    const formOption = {
        id: { data: dataJourneyId, option: optionJourneyId, node: null },
        journeyName: { data: dataJourneyName, option: optionJourneyName, node: null },
        estimateStartTime: { data: dataJourneyEstimateStartTime, option: optionJourneyEstimateStartTime, node: null },
        estimateEndTime: { data: dataJourneyEstimateEndTime, option: optionJourneyEstimateEndTime, node: null },
    };
    return formOption;
}


export class JourneyAddModal extends React.Component {
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

        this.formOption = createFormOption1(this.state.journey.id, this.state.journey.journeyName, this.state.journey.estimateStartTime, this.state.journey.estimateEndTime);
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
        if (!this.formNode.doValidate()){
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
                        <FormCRUDJourney ref={thisNode => {this.formNode = thisNode}} journey={this.state.journey} formOption={this.formOption} action="create" />
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

var createFormOption = (id, name, price) => {
    // ProductId
    const dataProductId = {
        controlId: 'controlProductId',
        controlType: 'text',
        label: 'Product Id',
        field: 'id',
        value: id,
        isValid: true,
        isDisable: false
    };
    const optionProductId = {
        validator: BSTValidatorHelper.validatateProductId,
        triggerValidator: null
    };

    // ProductName
    const dataProductName = {
        controlId: 'controlProductName',
        controlType: 'text',
        label: 'Product name',
        field: 'name',
        value: name,
        isValid: true,
        isDisable: false
    }
    const optionProductName = {
        validator: BSTValidatorHelper.validatateProductName,
        triggerValidator: null
    }

    // ProductPrice
    const dataProductPrice = {
        controlId: 'controlProductPrice',
        controlType: 'text',
        label: 'Product price',
        field: 'price',
        value: price,
        isValid: true,
        isDisable: false
    };
    const optionProductPrice = {
        validator: BSTValidatorHelper.validatateProductPrice,
    }

    const formOption = {
        id: { data: dataProductId, option: optionProductId, node: null },
        name: { data: dataProductName, option: optionProductName, node: null },
        price: { data: dataProductPrice, option: optionProductPrice, node: null },
    };
    return formOption;
}
export class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.formOption = createFormOption(this.props.product.id, this.props.product.name, this.props.product.price);
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
                <Button bsStyle="info" bsSize="small" onClick={this.showModal}>Detail</Button>

                <Modal {...this.props}  show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Product detail</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ProductFormModal product={this.props.product} formOption={this.formOption} action="read" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}


export class ProductEditModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.formOption = createFormOption(this.props.product.id, this.props.product.name, this.props.product.price);
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
        for (const field in this.formOption) {
            // This cause the UI validation to be updated
            this.formOption[field].node.handleChange();
        }

        const product = {};
        // If there is one input field not validated, save action will be aborted
        for (const field in this.formOption) {
            if (!this.formOption[field].data.isValid) {
                return;
            }

            product[field] = this.formOption[field].data.value;
        }

        // Do edit
        this.props.handleEditAction(product);
        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle="warning" bsSize="small" onClick={this.showModal}>Edit</Button>

                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Edit product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ProductFormModal product={this.props.product} formOption={this.formOption} action="update" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.handleEditAction}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}

export class ProductDeleteModal extends React.Component {
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

    handleDeleteAction = () => {
        // const product = .....
        this.props.handleDeleteAction(this.props.product.id);
        this.hideModal();
    }

    render = () => {
        return (
            <ButtonToolbar>
                <Button bsStyle="danger" bsSize="small" onClick={this.showModal}>Delete</Button>

                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Delete this product?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ProductFormModal product={this.props.product} action="delete" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button bsStyle="danger" onClick={this.handleDeleteAction}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}

