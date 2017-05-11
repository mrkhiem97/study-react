import React from 'react';
import ReactDOM from 'react-dom';
import { BSTValidatorHelper } from '../custom-validators/custom-validator';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';


const createFormState = (journey) => {
    const formState = {
        id: {
            hidden: true,
            data: {
                controlId: 'controlJourneyId',
                label: 'Journey Id',
                value: journey.id,
                validateStatus: {},
            },
            option: {
                validator: BSTValidatorHelper.validatateJourneyId,
            }
        },
        journeyName: {
            hidden: false,
            data: {
                controlId: 'controlJourneyName',
                label: 'Journey Name',
                value: journey.journeyName,
                validateStatus: {},
            }, option: {
                validator: BSTValidatorHelper.validatateJourneyName,
            }
        },
        estimateStartTime: {
            hidden: false,
            data: {
                controlId: 'controlJourneyEstimateStartTime',
                label: 'Estimate start time',
                value: journey.estimateStartTime,
                validateStatus: {},
            }, option: {
                validator: BSTValidatorHelper.validatateJourneyPrice,
            }
        },
        estimateEndTime: {
            hidden: false,
            data: {
                controlId: 'controlJourneyEstimateEndTime',
                label: 'Estimate end time',
                value: journey.estimateEndTime,
                validateStatus: {},
            }, option: {
                validator: BSTValidatorHelper.validatateJourneyPrice,
            }
        },
    };

    return formState;
}

/* Create Journey Form */
export default class FormCRUDJourney extends React.Component {
    constructor(props) {
        super(props);

        // Form properties

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 2. Set initial state
        this.state = {
            formState: createFormState(this.props.journey)
        };

        // 3. Base on action, decide the initial state of form data
        if (this.action === 'create') {
            console.log(`FormCRUDJourney: action = create`);
            // Object.assign(this.journey, this.defaultFormData);
        } else if (this.action === 'update') {
            console.log(`FormCRUDJourney: action = update`);
            // Object.assign(this.journey, this.props.journey);
        } else if (this.action === 'read') {
            console.log(`FormCRUDJourney: action = read`);
            // Object.assign(this.journey, this.props.journey);
        } else if (this.action === 'delete') {
            console.log(`FormCRUDJourney: action = delete`);
            // Object.assign(this.journey, this.props.journey);
        } else {
            console.error(`FormCRUDJourney: Action is invalid. Please choose either (create | read | update | delete)`);
            // Object.assign(this.journey, this.defaultFormData);
        }
    }

    // Handle when input data changed
    onChange = (e, field) => {
        let controlValue = '';
        if (typeof (e) === 'string') {
            controlValue = e;
        } else {
            controlValue = e.target.value;
        }
        console.log(`onChange: ${typeof (e)} - Value: ${controlValue} - Field: ${field}`);
        // { status: 'success', message: '', valid: true }

        const formFieldManager = this.state.formState[field];
        formFieldManager.data.value = controlValue;
        this.props.journey[field] = controlValue;

        // Do validation base on interface validator
        formFieldManager.data.validateStatus = formFieldManager.option.validator(controlValue);

        this.setState({
            formState: this.state.formState
        });
    }

    // Do validation
    doValidate = () => {
        let isFormValid = true;
        for (const field in this.state.formState) {
            // Do validation base on interface validator
            console.log(`Trigger validate on [${field}]: ${this.state.formState[field]}`);
            const formFieldManager = this.state.formState[field];
            if (formFieldManager.hidden) continue;
            formFieldManager.data.validateStatus = formFieldManager.option.validator(formFieldManager.data.value);
            isFormValid &= formFieldManager.data.validateStatus.valid;
        }

        // Re render
        this.setState({
            formState: this.state.formState
        });

        return isFormValid;
    }

    getJourney = () => {
        const journey = {};
        for (const field in this.state.formState) {
            journey[field] = this.state.formState[field].data.value;
        }

        return journey;
    }

    getValidationState = (field) => {
        return this.state.formState[field].data.validateStatus.status;
    }

    getValidationMessage = (field) => {
        return this.state.formState[field].data.validateStatus.message;
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
                        <FormGroup controlId={this.state.formState['journeyName'].data.controlId} validationState={this.getValidationState('journeyName')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.state.formState['journeyName'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type='text'
                                    disabled={this.state.formState['journeyName'].data.isDisable}
                                    value={this.state.formState['journeyName'].data.value}
                                    placeholder={this.state.formState['journeyName'].placeHolder}
                                    onChange={(e) => this.onChange(e, 'journeyName')} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.getValidationMessage('journeyName')}</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId={this.state.formState['estimateStartTime'].data.controlId} validationState={this.getValidationState('estimateStartTime')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.state.formState['estimateStartTime'].data.label}
                            </Col>
                            <Col sm={10}>
                                <DateTimeField
                                    inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                    dateTime={this.state.formState['estimateStartTime'].data.value}
                                    onChange={(e) => this.onChange(e, 'estimateStartTime')}
                                />
                                <HelpBlock>{this.getValidationMessage('estimateStartTime')}</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId={this.state.formState['estimateEndTime'].data.controlId} validationState={this.getValidationState('estimateEndTime')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {this.state.formState['estimateEndTime'].data.label}
                            </Col>
                            <Col sm={10}>
                                <DateTimeField
                                    inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                    dateTime={this.state.formState['estimateEndTime'].data.value}
                                    onChange={(e) => this.onChange(e, 'estimateEndTime')}
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
