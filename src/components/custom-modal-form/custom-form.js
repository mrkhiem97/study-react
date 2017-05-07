import React from 'react';
import * as RB from 'react-bootstrap';
import ReactDOM from 'react-dom';

const Button = RB.Button;
const Modal = RB.Modal;
const ButtonToolbar = RB.ButtonToolbar;
const ControlLabel = RB.ControlLabel;
const FormControl = RB.FormControl;
const FormGroup = RB.FormGroup;
const HelpBlock = RB.HelpBlock;


export default class FormExample extends React.Component {
    constructor(props) {
        super(props);
        this.product = {
            id: '',
            name: '',
            price: 0
        };
        this.state = {
            product: this.product
        };
    }

    static msg = ''
    getValidateProductId = () => {
        const length = this.state.product.id.length;
        if (length > 10) return { status: 'success', message: '' }
        else if (length > 5) return { status: 'warning', message: 'Length must be > 10' }
        else if (length > 0) return { status: 'error', message: 'Length must be > 10' }
        else return { status: null, message: '' };
    }

    getValidationState = () => {
        const validateInput = this.getValidateProductId();
        this.msg = validateInput.message;
        return validateInput.status;
    }

    handleChange = (e) => {
        for (let field in this.product) {
            let item = this.product[field];
            console.debug(`Field: ${field}`);

            const node = ReactDOM.findDOMNode(this.refs[field]);
            console.debug(`Input value: ${node.value}`);
            this.product[field] = node.value;
        }
        this.setState({ product: this.product });
    }

    render() {
        return (
            <form>
                <FormGroup controlId="controlProductId">
                    <ControlLabel>Product Id</ControlLabel>
                    <FormControl type="text" value={this.state.product.id} placeholder="Product Id" ref="id" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.msg}</HelpBlock>
                </FormGroup>
                <FormGroup controlId="controlProductName" validationState={this.getValidationState()}>
                    <ControlLabel>Product Name</ControlLabel>
                    <FormControl type="text" value={this.state.value} placeholder="Enter text" ref="name" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.msg}</HelpBlock>
                </FormGroup>
                <FormGroup controlId="controlProductPrice">
                    <ControlLabel>Product price</ControlLabel>
                    <FormControl type="text" value={this.state.value} placeholder="Enter text" ref="price" onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.msg}</HelpBlock>
                </FormGroup>
            </form>
        );
    }
};
