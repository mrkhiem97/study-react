import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { JourneyValidatorHelper } from '../validators/JourneyValidatorHelper';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Col, Button, Glyphicon, Panel, Table } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_CONTROL_VALUE': {
            // Create new state
            const newState = {};
            Object.assign(newState, state);

            const formFieldManager = newState.mainForm[action.field];
            if (!isNaN(action.value)) {
                formFieldManager.data.value = Number(action.value);
            } else {
                formFieldManager.data.value = String(action.value);
            }

            // Do validation base on interface validator
            formFieldManager.data.validateStatus = formFieldManager.option.validator(action.value);

            return newState;
        }

        case 'CHANGE_ROUTE_CONTROL_VALUE': {
            // Create new state
            const newState = {};
            Object.assign(newState, state);

            const formFieldManager = newState.subForm[action.field];
            if (!isNaN(action.value)) {
                formFieldManager.data.value = Number(action.value);
            } else {
                formFieldManager.data.value = String(action.value);
            }

            return newState;
        }

        case 'ADD_ROUTE': {
            // Create new state
            const newState = {};
            Object.assign(newState, state);

            const routeStartAddress = state.subForm['routeStartAddress'].data.value;
            const routeEndAddress = state.subForm['routeEndAddress'].data.value;
            const routeStartTime = state.subForm['routeStartTime'].data.value;
            console.log(`Start address: ${routeStartAddress} - End addess: ${routeEndAddress} - StartTime: ${routeStartTime}`);

            let isInputsValid = true;
            const routeInputArr = [routeStartAddress, routeEndAddress, routeStartTime];
            routeInputArr.forEach((x) => {
                if (x.toString().trim() === '') {
                    isInputsValid = false;
                    return;
                }
            });

            if (!isInputsValid) return;

            const route = {
                routeStartAddress,
                routeEndAddress,
                routeStartTime
            };

            // Add to table
            newState.routes.push(route);

            return newState;
        }

        case 'FORCE_VALIDATE': {
            const newState = {};
            // Create new state
            Object.assign(newState, state);
            for (const field in state.mainForm) {
                if (field === 'isFormValidated') continue;

                // Do validation base on interface validator
                const formFieldManager = newState.mainForm[field];
                if (formFieldManager.hidden) continue;

                if (formFieldManager.option.validator !== null) {
                    formFieldManager.data.validateStatus = formFieldManager.option.validator(formFieldManager.data.value);
                    newState['isFormValidated'] &= formFieldManager.data.validateStatus.valid;
                }
            }

            return newState;
        }

        case 'CREATE_INITIAL_STATE': {
            return action.initialState;
        }

        default: {
            return state;
        }
    }
}

function createInitialState(journey) {
    return {
        mainForm: {
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
                    placeholder: 'Journey name',
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
        },

        subForm: {
            routeStartAddress: {
                hidden: false,
                data: {
                    controlId: 'controlRouteStartAddress',
                    label: 'Start address',
                    value: '',
                    placeholder: 'Start address',
                    validateStatus: {},
                }, option: {
                    validator: null,
                }
            },

            routeEndAddress: {
                hidden: false,
                data: {
                    controlId: 'controlRouteEndAddress',
                    label: 'End address',
                    value: '',
                    placeholder: 'End address',
                    validateStatus: {},
                }, option: {
                    validator: null,
                }
            },

            routeStartTime: {
                hidden: false,
                data: {
                    controlId: 'controlStartTime',
                    label: 'Start time',
                    value: moment().valueOf(),
                    validateStatus: {},
                }, option: {
                    validator: null,
                }
            },
        },

        routes: []
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

function createChangeRouteControlValueAction(field, value) {
    return {
        type: 'CHANGE_ROUTE_CONTROL_VALUE',
        field: field,
        value: value
    }
}

function createAddRouteAction() {
    return {
        type: 'ADD_ROUTE',
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
        return store.getState().mainForm.isFormValidated;
    }

    // Get journey
    getEntity = () => {
        const state = store.getState();

        for (const field in this.props.entity) {
            this.props.entity[field] = state.mainForm[field].data.value;

            if (!isNaN(state[field].data.value)) {
                this.props.entity[field] = Number(state.mainForm[field].data.value);
            } else {
                this.props.entity[field] = String(state.mainForm[field].data.value);
            }
        }

        return this.props.entity;
    }

    onRouteFormChange = (field, value) => {
        store.dispatch(createChangeRouteControlValueAction(field, value));
    }

    onAddRoute = () => {
        store.dispatch(createAddRouteAction());
    }

    // Get journey
    getRoutes = () => {
        return store.getState().routes;
    }

    // Render
    // Must change to adapt 
    render() {
        const state = store.getState();

        // Journey
        const stateJourneyName = state.mainForm['journeyName'].data;
        const stateEstimateStartTime = state.mainForm['estimateStartTime'].data;
        const stateEstimateEndTime = state.mainForm['estimateEndTime'].data;

        // Route
        const stateRouteStartAddress = state.subForm['routeStartAddress'].data;
        const stateRouteEndAddress = state.subForm['routeEndAddress'].data;
        const stateRouteStartTime = state.subForm['routeStartTime'].data;

        const Routes = (
            state.routes.map((route, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{route.routeStartAddress}</td>
                        <td>{route.routeEndAddress}</td>
                        <td>{moment(route.routeStartTime).format('YYYY/MM/DD - HH:mm:ss A')}</td>
                        <td>
                            <Button bsSize='xsmall' bsStyle="link">
                                <Glyphicon glyph="glyphicon glyphicon-remove" />
                            </Button>
                        </td>
                    </tr>
                )
            })
        );

        if (this.action === 'delete') {
            return (
                < div ></div>
            );
        } else {
            return (
                <div>
                    <div className=''>
                        <Form horizontal>
                            <FormGroup bsSize='sm' controlId={stateJourneyName.controlId} validationState={stateJourneyName.validateStatus.status}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {stateJourneyName.label}
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type='text'
                                        disabled={stateJourneyName.isDisable}
                                        value={stateJourneyName.value}
                                        placeholder={stateJourneyName.placeholder}
                                        onChange={(e) => this.onChange('journeyName', e.target.value)} />
                                    <FormControl.Feedback />
                                    <HelpBlock>{stateJourneyName.validateStatus.message}</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup bsSize='sm'>
                                <Col sm={6}>
                                    <FormGroup controlId={stateEstimateStartTime.controlId} validationState={stateEstimateStartTime.validateStatus.status}>
                                        <Col componentClass={ControlLabel} sm={4}>
                                            {stateEstimateStartTime.label}
                                        </Col>
                                        <Col sm={8}>
                                            <DateTimeField
                                                inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                                dateTime={stateEstimateStartTime.value}
                                                onChange={(e) => this.onChange('estimateStartTime', e)}
                                            />
                                            <HelpBlock>{stateEstimateStartTime.validateStatus.message}</HelpBlock>
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup controlId={stateEstimateEndTime.controlId} validationState={stateEstimateEndTime.validateStatus.status}>
                                        <Col componentClass={ControlLabel} sm={4}>
                                            {stateEstimateEndTime.label}
                                        </Col>
                                        <Col sm={8}>
                                            <DateTimeField
                                                inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                                dateTime={stateEstimateEndTime.value}
                                                onChange={(e) => this.onChange('estimateEndTime', e)}
                                            />
                                            <HelpBlock>{stateEstimateEndTime.validateStatus.message}</HelpBlock>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>

                    {/* Routes */}
                    <div className=''>
                        <Panel header="Journey routes...">
                            <Col smOffset={0} sm={6}>
                                <Form>
                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Start address
                                        </Col>
                                        <Col smOffset={0} sm={9}>
                                            <FormControl
                                                type='text'
                                                disabled={stateRouteStartAddress.isDisable}
                                                value={stateRouteStartAddress.value}
                                                placeholder={stateRouteStartAddress.placeholder}
                                                onChange={(e) => this.onRouteFormChange('routeStartAddress', e.target.value)} />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            End address
                                        </Col>
                                        <Col smOffset={0} sm={9}>
                                            <FormControl
                                                type='text'
                                                disabled={stateRouteEndAddress.isDisable}
                                                value={stateRouteEndAddress.value}
                                                placeholder={stateRouteEndAddress.placeholder}
                                                onChange={(e) => this.onRouteFormChange('routeEndAddress', e.target.value)} />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Start time
                                        </Col>
                                        <Col smOffset={0} sm={8}>
                                            <DateTimeField
                                                inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                                dateTime={stateRouteStartTime.value}
                                                onChange={(e) => this.onRouteFormChange('routeStartTime', e)}
                                            />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                        <Col smOffset={0} sm={1}>
                                            <Button bsSize='xsmall' bsStyle='info' onClick={this.onAddRoute}>
                                                <Glyphicon glyph="glyphicon glyphicon-plus" />
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col smOffset={0} sm={12}>
                                            <Panel collapsible defaultExpanded header="Routes.....">
                                                <Table condensed hover>
                                                    <tbody>
                                                        {Routes}
                                                    </tbody>
                                                </Table>
                                            </Panel>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Panel>
                    </div>
                </div >
            );
        }
    }
}
