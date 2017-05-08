import React from 'react';
import ReactDOM from 'react-dom';

import * as RB from 'react-bootstrap';
const Button = RB.Button;
const ControlLabel = RB.ControlLabel;
const FormControl = RB.FormControl;
const FormGroup = RB.FormGroup;
const HelpBlock = RB.HelpBlock;


export default class InputControl extends React.Component {
    constructor(props) {
        super(props);

        // 1. Define control validate status interface
        this.controlStatus = {
            status: null,
            message: '',
            valid: true
        };

        // 2. State of control will be the inputted value
        this.state = {
            value: this.props.data.value
        };
    }

    // Handle when input data changed
    handleChange = () => {
        const node = ReactDOM.findDOMNode(this.refs[this.props.data.field]);

        // Do validation base on infterface validator
        this.controlStatus = this.props.options.validator(node.value);
        this.props.data.value = node.value;
        this.props.data.isValid = this.controlStatus.valid;

        this.setState({
            value: node.value
        });
    }

    getValidationState = () => {
        return this.controlStatus.status;
    }

    getDisableState = () => {
        return false;
    }

    getValidateMessage = () => {
        return this.controlStatus.message;
    }

    render() {
        return (
            <FormGroup controlId={this.props.data.controlId} validationState={this.getValidationState()}>
                <ControlLabel>{this.props.data.label}</ControlLabel>
                <FormControl type={this.props.data.controlType} disabled={this.props.data.isDisable} value={this.state.value} placeholder={this.props.data.placeHolder} ref={this.props.data.field} onChange={this.handleChange} />
                <FormControl.Feedback />
                <HelpBlock>{this.getValidateMessage()}</HelpBlock>
            </FormGroup>
        );
    }
}
