import React from 'react';
import { createStore } from 'redux';
import { JourneyValidatorHelper } from '../validators/JourneyValidatorHelper';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';


function reducer(state, action) {
    if (action.type === 'CHANGE_CONTROL_VALUE') {
        // Create new state
        const newState = {};
        Object.assign(newState, state);

        const formFieldManager = newState[action.field];
        if (!isNaN(action.value)) {
            formFieldManager.data.value = Number(action.value);
        } else {
            formFieldManager.data.value = String(action.value);
        }

        // Do validation base on interface validator
        formFieldManager.data.validateStatus = formFieldManager.option.validator(action.value);

        return newState;
    } else if (action.type === 'FORCE_VALIDATE') {
        const newState = {};
        // Create new state
        Object.assign(newState, state);
        for (const field in state) {
            if (field === 'isFormValidated') continue;

            // Do validation base on interface validator
            const formFieldManager = newState[field];
            if (formFieldManager.hidden) continue;

            formFieldManager.data.validateStatus = formFieldManager.option.validator(formFieldManager.data.value);
            newState['isFormValidated'] &= formFieldManager.data.validateStatus.valid;
        }

        return newState;
    } else if (action.type === 'CREATE_INITIAL_STATE') {
        return action.initialState;
    }

    return state;
}

function createInitialState(journey) {
    return {
        isFormValidated: true,
        id: {
            hidden: true,
            data: {
                controlId: 'controlJourneyId',
                label: 'Journey Id',
                value: journey.id,
                validateStatus: {},
            },
            option: {
                validator: JourneyValidatorHelper.validatateJourneyId,
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
                validator: JourneyValidatorHelper.validatateJourneyName,
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
                validator: JourneyValidatorHelper.validatateJourneyDateTime,
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
                validator: JourneyValidatorHelper.validatateJourneyDateTime,
            }
        },
    };
}

// Redux store declare
const store = createStore(reducer);

function createChangeControlValueAction(field, value) {
    return {
        type: 'CHANGE_CONTROL_VALUE',
        field: field,
        value: value
    }
}

function createForceValidateAction() {
    return {
        type: 'FORCE_VALIDATE',
    }
}

function createInitialStateAction(initialState) {
    return {
        type: 'CREATE_INITIAL_STATE',
        initialState: initialState
    }
}

/* Create Journey Form */
export default class FormCRUDJourney extends React.Component {
    constructor(props) {
        super(props);

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 3. Base on action, decide the initial state of form data
        if (this.action === 'create') {
            console.log(`FormCRUDJourney: action = create`);
            // Object.assign(this.journey, this.defaultFormData);
        } else if (this.action === 'update') {
            console.log(`FormCRUDJourney: action = update`);
            // Object.assign(this.journey, this.props.entity);
        } else if (this.action === 'read') {
            console.log(`FormCRUDJourney: action = read`);
            // Object.assign(this.journey, this.props.entity);
        } else if (this.action === 'delete') {
            console.log(`FormCRUDJourney: action = delete`);
            // Object.assign(this.journey, this.props.entity);
        } else {
            console.error(`FormCRUDJourney: Action is invalid. Please choose either (create | read | update | delete)`);
            // Object.assign(this.journey, this.defaultFormData);
        }

        // Set initial state
        store.dispatch(createInitialStateAction(createInitialState(this.props.entity)));
    }

    componentDidMount() {
        // Change state
        store.subscribe(() => this.forceUpdate());
    }

    // Handle when input data changed
    onChange = (field, value) => {
        store.dispatch(createChangeControlValueAction(field, value));
    }

    // Do validation
    doValidate = () => {
        store.dispatch(createForceValidateAction());
        return store.getState().isFormValidated;
    }

    // Get journey
    getEntity = () => {
        const state = store.getState();

        for (const field in this.props.entity) {
            this.props.entity[field] = state[field].data.value;

            if (!isNaN(state[field].data.value)) {
                this.props.entity[field] = Number(state[field].data.value);
            } else {
                this.props.entity[field] = String(state[field].data.value);
            }
        }

        return this.props.entity;
    }

    getValidationState = (field) => {
        return store.getState()[field].data.validateStatus.status;
    }

    getValidationMessage = (field) => {
        return store.getState()[field].data.validateStatus.message;
    }

    // Render
    // Must change to adapt 
    render() {
        const state = store.getState();

        if (this.action === 'delete') {
            return (
                <div></div>
            );
        } else {
            return (
                <div>
                    <Form horizontal>
                        <FormGroup bsSize='sm' controlId={state['journeyName'].data.controlId} validationState={this.getValidationState('journeyName')}>
                            <Col componentClass={ControlLabel} sm={2}>
                                {state['journeyName'].data.label}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type='text'
                                    disabled={state['journeyName'].data.isDisable}
                                    value={state['journeyName'].data.value}
                                    placeholder={state['journeyName'].placeHolder}
                                    onChange={(e) => this.onChange('journeyName', e.target.value)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.getValidationMessage('journeyName')}</HelpBlock>
                            </Col>
                        </FormGroup>
                        <FormGroup bsSize='sm'>
                            <Col sm={6}>
                                <FormGroup controlId={state['estimateStartTime'].data.controlId} validationState={this.getValidationState('estimateStartTime')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {state['estimateStartTime'].data.label}
                                    </Col>
                                    <Col sm={8}>
                                        <DateTimeField
                                            inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                            dateTime={state['estimateStartTime'].data.value}
                                            onChange={(e) => this.onChange('estimateStartTime', e)}
                                        />
                                        <HelpBlock>{this.getValidationMessage('estimateStartTime')}</HelpBlock>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup controlId={state['estimateEndTime'].data.controlId} validationState={this.getValidationState('estimateEndTime')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {state['estimateEndTime'].data.label}
                                    </Col>
                                    <Col sm={8}>
                                        <DateTimeField
                                            inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                            dateTime={state['estimateEndTime'].data.value}
                                            onChange={(e) => this.onChange('estimateEndTime', e)}
                                        />
                                        <HelpBlock>{this.getValidationMessage('estimateEndTime')}</HelpBlock>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </FormGroup>

                    </Form>
                </div>
            );
        }
    }
}
