import React from 'react';

import ReactDOM from 'react-dom';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js';
import InputControl from './custom-form-control';

import * as RB from 'react-bootstrap';
const Button = RB.Button;
const ControlLabel = RB.ControlLabel;
const FormControl = RB.FormControl;
const FormGroup = RB.FormGroup;
const HelpBlock = RB.HelpBlock;


export default class ProductFormModal extends React.Component {
    constructor(props) {
        super(props);

        // Form properties

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 2. Validate Message Table
        this.validateMsgTable = {
            id: { status: null, message: '' },
            name: { status: null, message: '' },
            price: { status: null, message: '' }
        };

        // 3. Default null state
        this.product = {};
        this.defaultFormData = {
            id: '',
            name: '',
            price: 0
        };

        // 4. Base on action, decide the initial state of form data
        if (this.action === 'create') {
            console.log(`Form-Modal: action = create`);
            Object.assign(this.product, this.defaultFormData);
        } else if (this.action === 'update') {
            console.log(`Form-Modal: action = update`);
            Object.assign(this.product, this.props.product);
        } else if (this.action === 'read') {
            console.log(`Form-Modal: action = read`);
            Object.assign(this.product, this.props.product);
        } else if (this.action === 'delete') {
            console.log(`Form-Modal: action = delete`);
            Object.assign(this.product, this.props.product);
        } else {
            console.error(`Form-Modal: Action is invalid. Please choose either (create | read | update | delete)`);
            Object.assign(this.product, this.defaultFormData);
        }


        // Set initial state
        this.state = {
            formData: this.product
        };
    }

    // Handle input validation when data on input field changed
    getValidationState = (field) => {
        console.log(`Get validate msg for field ${field}: ${this.validateMsgTable[field].status}`);
        return this.validateMsgTable[field].status;
    }

    // Handle when form data changed
    handleChange = (e) => {
        for (let field in this.product) {
            // let item = this.product[field];
            const node = ReactDOM.findDOMNode(this.refs[field]);
            console.debug(`Field: ${field} - Input value: ${node.value}`);

            // Update state
            this.product[field] = node.value;

            // Validate on change
            if (field === 'id') {
                this.validateMsgTable[field] = BSTValidatorHelper.validatateProductId(node.value);
            } else if (field === 'name') {
                this.validateMsgTable[field] = BSTValidatorHelper.validatateProductName(node.value);
            } else if (field === 'price') {
                this.validateMsgTable[field] = BSTValidatorHelper.validatateProductPrice(node.value);
            } else {
                // Do nothing
            }
        }

        // Copy property from current state to outside 
        Object.assign(this.props.product, this.product);
        // Set state
        this.setState({ formData: this.product });
    }

    checkAction = () => {
        if (this.action === 'create') {
            // Find status
            return false;
        } else { this.action === 'update' } {
            return true;
        }
    }

    render() {
        if (this.action === 'delete') {
            return (
                <div></div>
            );
        } else {
            console.log(`Render action: ${this.action}`);

            return (
                <form>
                    <FormGroup controlId="controlProductId" validationState={this.getValidationState("id")}>
                        <ControlLabel>Product Id</ControlLabel>
                        <FormControl type="text" disabled={this.checkAction()} value={this.state.formData.id} placeholder="Product Id" ref="id" onChange={this.handleChange} />
                        <FormControl.Feedback />
                        <HelpBlock>{this.validateMsgTable["id"].message}</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="controlProductName" validationState={this.getValidationState("name")}>
                        <ControlLabel>Product Name</ControlLabel>
                        <FormControl type="text" value={this.state.formData.name} placeholder="Product name" ref="name" validator={BSTValidatorHelper.validatateProductName} onChange={this.handleChange} />
                        <FormControl.Feedback />
                        <HelpBlock>{this.validateMsgTable["name"].message}</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId="controlProductPrice" validationState={this.getValidationState("price")}>
                        <ControlLabel>Product price</ControlLabel>
                        <FormControl type="text" value={this.state.formData.price} placeholder="Product price" ref="price" onChange={this.handleChange} />
                        <FormControl.Feedback />
                        <HelpBlock>{this.validateMsgTable["price"].message}</HelpBlock>
                    </FormGroup>

                    <InputControl
                        data={{ controlId: 'testControl', controlType: 'text', label: 'We are going to die', field: 'birthday', value: 'mrkhiem97@gmail.com', isValid: true, isDisable: false }}
                        options={{ validator: BSTValidatorHelper.validatateOther }}
                    />
                </form>
            );
        }
    }
}
