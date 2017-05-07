import React from 'react';

import ReactDOM from 'react-dom';
import { BSTValidatorHelper } from '../custom-validators/custom-validator.js'

import * as RB from 'react-bootstrap';
const Button = RB.Button;
const ControlLabel = RB.ControlLabel;
const FormControl = RB.FormControl;
const FormGroup = RB.FormGroup;
const HelpBlock = RB.HelpBlock;


export default class ProductFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.product = {
            id: '',
            name: '',
            price: 0
        };
        this.validateMsgTable = {
            id: { status: null, message: '' },
            name: { status: null, message: '' },
            price: { status: null, message: '' }
        };

        // Set initial state
        this.state = {
            product: this.product
        };
    }

    getValidationState = (field) => {
        console.log(`Get validate msg for field ${field}: ${this.validateMsgTable[field].status}`);
        return this.validateMsgTable[field].status;
    }

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

        // Set state
        this.setState({ product: this.product });
    }

    render() {
        return (
            <form>
                <FormGroup controlId="controlProductId" validationState={this.getValidationState("id")}>
                    <ControlLabel>Product Id</ControlLabel>
                    <FormControl type="text" value={this.state.product.id} placeholder="Product Id" ref="id" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.validateMsgTable["id"].message}</HelpBlock>
                </FormGroup>

                <FormGroup controlId="controlProductName" validationState={this.getValidationState("name")}>
                    <ControlLabel>Product Name</ControlLabel>
                    <FormControl type="text" value={this.state.value} placeholder="Enter text" ref="name" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.validateMsgTable["name"].message}</HelpBlock>
                </FormGroup>

                <FormGroup controlId="controlProductPrice" validationState={this.getValidationState("price")}>
                    <ControlLabel>Product price</ControlLabel>
                    <FormControl type="text" value={this.state.value} placeholder="Enter text" ref="price" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.validateMsgTable["price"].message}</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}
