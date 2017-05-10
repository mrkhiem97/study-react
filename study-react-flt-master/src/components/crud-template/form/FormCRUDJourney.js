import React from 'react';
import ReactDOM from 'react-dom';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';


export default class FormCRUDJourney extends React.Component {
    constructor(props) {
        super(props);

        // Form properties

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 2. Default null state
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

        this.state = {
            formFields: {
                id: '',
                journeyName: '',
                estimateStartTime: `${moment().valueOf()}`,
                estimateEndTime: `${moment().valueOf()}`,
            }
        };
    }

    // Handle when input data changed
    onChange = (e, field) => {

        let controlValue = '';
        if (typeof (e) === 'string') {
            controlValue = e;
        } else {
            controlValue = e.target.value;
        }
        console.log(`onChange: ${typeof (e)} - Value: ${controlValue}`);
        // { status: 'success', message: '', valid: true }
        this.formOption[field].data.value = controlValue;

        // Do validation base on interface validator
        this.formOption[field].data.validateStatus = this.formOption[field].option.validator(controlValue);

        const formFields = Object.assign({}, this.state.formFields);
        formFields[field] = controlValue;
        this.setState({
            formFields: formFields
        });
    }

    // Do validation
    doValidate = () => {
        let isFormValid = true;
        for (const field in this.state.formFields) {
            // Do validation base on interface validator
            console.log(`Trigger validate on [${field}]: ${this.state.formFields[field]}`);
            this.formOption[field].data.validateStatus = this.formOption[field].option.validator(this.state.formFields[field]);
            isFormValid &= this.formOption[field].data.validateStatus.valid;
        }

        // Re render
        this.setState({
            formFields: this.state.formFields
        });

        return isFormValid;
    }

    getValidationState = (field) => {
        return this.formOption[field].data.validateStatus.status;
    }

    getValidationMessage = (field) => {
        return this.formOption[field].data.validateStatus.message;
    }

    render() {
        if (this.action === 'delete') {
            return (
                <div></div>
            );
        } else {
            return (
                <div>
                    <Form horizontal>
                        <FormGroup controlId={this.formOption['journeyName'].data.controlId} validationState={this.getValidationState('journeyName')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.formOption['journeyName'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type='text'
                                    disabled={this.formOption['journeyName'].data.isDisable}
                                    value={this.state.formFields.journeyName}
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
                                <DateTimeField
                                    inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                    dateTime={this.state.formFields.estimateStartTime}
                                    onChange={(e) => this.onChange(e, this.formOption['estimateStartTime'].data.field)}
                                />
                                <HelpBlock>{this.getValidationMessage('estimateStartTime')}</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId={this.formOption['estimateEndTime'].data.controlId} validationState={this.getValidationState('estimateEndTime')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.formOption['estimateEndTime'].data.label}
                            </Col>
                            <Col sm={10}>
                                <DateTimeField
                                    inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                    dateTime={this.state.formFields.estimateEndTime}
                                    onChange={(e) => this.onChange(e, this.formOption['estimateEndTime'].data.field)}
                                />
                                <HelpBlock>{this.getValidationMessage('estimateEndTime')}</HelpBlock>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        }
    }
}
