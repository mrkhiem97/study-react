import React from 'react';
import * as RB from 'react-bootstrap';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js';
import ProductForm from './custom-form.js'

const Button = RB.Button;
const Modal = RB.Modal;
const ButtonToolbar = RB.ButtonToolbar;

export class ProductAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.defaultProductData = {
            id: '',
            name: '',
            price: 0
        };

        this.state = {
            show: false,
            product: this.defaultProductData
        };

        // ProductId
        const dataProductId = {
            controlId: 'controlProductId',
            controlType: 'text',
            label: 'Product Id',
            field: 'id',
            value: this.state.product.id,
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
            value: this.state.product.name,
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
            value: this.state.product.price,
            isValid: true,
            isDisable: false
        };
        const optionProductPrice = {
            validator: BSTValidatorHelper.validatateProductPrice,
            triggerValidator: null
        }

        this.formOption = {
            id: { data: dataProductId, option: optionProductId },
            name: { data: dataProductName, option: optionProductName },
            price: { data: dataProductPrice, option: optionProductPrice },
        };
    }

    componentDidMount = () => {
        const product = {};
        Object.assign(product, this.defaultProductData);
        this.setState({
            show: false,
            product: product
        });
    }

    showModal = () => {
        const product = {};
        Object.assign(product, this.defaultProductData);
        this.setState({
            show: true,
            product: product
        });
    }

    hideModal = () => {
        const product = {};
        
        // Reset form input value when closed
        this.formOption["id"].data.value = '';
        this.formOption["name"].data.value = '';
        this.formOption["price"].data.value = '';

        Object.assign(product, this.defaultProductData);
        this.setState({
            show: false,
            product: product
        });
    }

    handleAddAction = () => {
        // Do validate again
        let product = {};


        for (let field in this.formOption) {
            this.formOption[field].option.triggerValidator.click();
            let value = this.formOption[field].data.value;
            let isValid = this.formOption[field].option.validator(value).valid;
            product[field] = value;

            if (!isValid) {
                this.forceUpdate();
                return;
            }
        }

        this.props.handleAddAction(product);
        this.hideModal();
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
                        <ProductForm product={this.state.product} formOption={this.formOption} action="create" />
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

export class ProductDetailModal extends React.Component {
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
                <Button bsStyle="info" bsSize="small" onClick={this.showModal}>Detail</Button>

                <Modal {...this.props} show={this.state.show} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Product detail</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ProductForm product={this.props.product} action="read" />
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
        // const product = .....
        this.props.handleEditAction(this.props.product);
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
                        <ProductForm product={this.props.product} action="update" />
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
                        <ProductForm product={this.props.product} action="delete" />
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

