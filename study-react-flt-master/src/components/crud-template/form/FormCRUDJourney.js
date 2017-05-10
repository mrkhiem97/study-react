import React from 'react';
import ReactDOM from 'react-dom';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Button, Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';

export default class FormCRUDJourney extends React.Component {
    constructor(props) {
        super(props);

        // Form properties

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 2. Default null state
        this.journey = {};
        this.defaultFormData = {
            id: '',
            journeyName: '',
            estimateStartTime: '',
            estimateEndTime: ''
        };

        // 3. Set formOption
        this.formOption = this.props.formOption;

        // 4. Base on action, decide the initial state of form data
        if (this.action === 'create') {
            console.log(`Form-Modal: action = create`);
            Object.assign(this.journey, this.defaultFormData);
        } else if (this.action === 'update') {
            console.log(`Form-Modal: action = update`);
            Object.assign(this.journey, this.props.journey);
        } else if (this.action === 'read') {
            console.log(`Form-Modal: action = read`);
            Object.assign(this.journey, this.props.journey);
        } else if (this.action === 'delete') {
            console.log(`Form-Modal: action = delete`);
            Object.assign(this.journey, this.props.journey);
        } else {
            console.error(`Form-Modal: Action is invalid. Please choose either (create | read | update | delete)`);
            Object.assign(this.journey, this.defaultFormData);
        }

        // Default validate status
        this.controlStatus = {};

        this.state = {
            formValue: {
                journeyName: '',
                estimateStartTime: '',
                estimateEndTime: ''
            }
        };
    }

    // Handle when form data changed
    updateControlValue = (field, controlValue, isControlValueValid) => {
        this.journey[field] = controlValue;

        // Copy property from current state to outside 
        Object.assign(this.props.product, this.journey);
    }

    checkAction = () => {
        if (this.action === 'create') {
            // Find status
            return false;
        }
        return true;
    }

    // Handle when input data changed
    onChange = (e, field) => {
        // { status: 'success', message: '', valid: true }
        this.formOption[field].data.value = e.target.value;

        // Do validation base on interface validator
        this.formOption[field].data.validateStatus = this.formOption[field].option.validator(e.target.value);

        const formValue = Object.assign({}, this.state.formValue);
        formValue[field] = e.target.value;
        this.setState({
            formValue: formValue
        });
    }

    // Do validation
    doValidate = () => {
        let isFormValid = true;
        for (const field in this.state.formValue) {
            // Do validation base on interface validator
            this.formOption[field].data.validateStatus = this.formOption[field].option.validator(this.state.formValue[field]);
            isFormValid = isFormValid & this.formOption[field].data.validateStatus.valid;
        }

        // Re render
        this.setState({
            formValue: this.state.formValue
        });

        return isFormValid;
    }

    getValidationState = (field) => {
        console.log(`Status: ${this.formOption[field].data.validateStatus.status}`);
        return this.formOption[field].data.validateStatus.status;
    }

    getValidationMessage = (field) => {
        console.log(`Status: ${this.formOption[field].data.validateStatus.message}`);
        return this.formOption[field].data.validateStatus.message;
    }

    render() {
        if (this.action === 'delete') {
            return (
                <div></div>
            );
        } else {
            console.log(`Render action: ${this.action}`);

            return (
                <div>
                    <Form horizontal>
                        <FormGroup controlId={this.formOption['journeyName'].data.controlId} validationState={this.getValidationState('journeyName')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.formOption['journeyName'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type={this.formOption['journeyName'].data.controlType}
                                    disabled={this.formOption['journeyName'].data.isDisable}
                                    value={this.state.formValue.journeyName}
                                    placeholder={this.props.formOption['journeyName'].placeHolder}
                                    onChange={(e) => this.onChange(e, this.formOption['journeyName'].data.field)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.getValidationMessage('journeyName')}</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId={this.formOption['estimateStartTime'].data.controlId} validationState={this.getValidationState('estimateStartTime')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.formOption['estimateStartTime'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type={this.formOption['estimateStartTime'].data.controlType}
                                    disabled={this.formOption['estimateStartTime'].data.isDisable}
                                    value={this.state.formValue.estimateStartTime}
                                    placeholder={this.props.formOption['estimateStartTime'].placeHolder}
                                    onChange={(e) => this.onChange(e, this.formOption['estimateStartTime'].data.field)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.getValidationMessage('estimateStartTime')}</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId={this.formOption['estimateEndTime'].data.controlId} validationState={this.getValidationState('estimateEndTime')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.formOption['estimateEndTime'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type={this.formOption['estimateEndTime'].data.controlType}
                                    disabled={this.formOption['estimateEndTime'].data.isDisable}
                                    value={this.state.formValue.estimateEndTime}
                                    placeholder={this.props.formOption['estimateEndTime'].placeHolder}
                                    onChange={(e) => this.onChange(e, this.formOption['estimateEndTime'].data.field)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.getValidationMessage('estimateEndTime')}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <DateTimeField />
                        </FormGroup>
                    </Form>
                </div>
            );
        }
    }
}
