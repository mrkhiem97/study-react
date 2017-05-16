import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { JourneyValidatorHelper } from '../validators/JourneyValidatorHelper';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Form, Col, Button, Glyphicon, Panel, Table } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import {reducer} from './rootReducer'
import {
    createChangeControlValueAction,
    createChangeRouteControlValueAction,
    createSearchRouteAction,
    createSearchRouteActionAsyn,
    createAddRouteAction,
    createForceValidateAction,
    createInitialStateAction,
} from './actions'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


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
            isFormValidated: true,

            routeStartAddress: {
                hidden: false,
                data: {
                    controlId: 'controlRouteStartAddress',
                    label: 'Start address',
                    value: '',
                    placeholder: 'Start address',
                    validateStatus: {},
                    allowNew: false,
                    multiple: false,
                    options: [],
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
                    allowNew: false,
                    multiple: false,
                    options: [],
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
const store = createStore(reducer, applyMiddleware(thunk));


/* Create Journey Form */
export default class FormCRUDJourney extends React.Component {
    constructor(props) {
        super(props);

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 3. Base on action, decide the initial state of form data
        if (this.action === 'create' || this.action === 'update' || this.action === 'read' || this.action === 'delete') {
            console.log(`FormCRUDJourney: action = ${this.action}`);
        } else {
            console.error(`FormCRUDJourney: Action is invalid. Please choose either (create | read | update | delete)`);
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

            if (!isNaN(state.mainForm[field].data.value)) {
                this.props.entity[field] = Number(state.mainForm[field].data.value);
            } else {
                this.props.entity[field] = String(state.mainForm[field].data.value);
            }
        }

        return this.props.entity;
    }

    onRouteFormChange = (field, options) => {
        store.dispatch(createChangeRouteControlValueAction(field, options));
    }

    onAddRoute = () => {
        store.dispatch(createAddRouteAction());
    }

    // Get journey
    getRoutes = () => {
        return store.getState().routes;
    }

    onSearch = (field, query) => {
        store.dispatch(createSearchRouteActionAsyn(field, query));
    }

    filterByCallback = (option, text) => {
        return true;
    };

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
                            <Button bsSize='xsmall' bsStyle='link'>
                                <Glyphicon glyph='glyphicon glyphicon-remove' />
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
                        <Panel header='Journey routes...'>
                            <Col smOffset={0} sm={6}>
                                <Form horizontal>
                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Start address
                                        </Col>
                                        <Col smOffset={0} sm={9}>
                                            <AsyncTypeahead
                                                {...stateRouteStartAddress}
                                                onSearch={(query) => { this.onSearch('routeStartAddress', query) }}
                                                filterBy={this.filterByCallback}
                                                onChange={(options) => this.onRouteFormChange('routeStartAddress', options)}
                                                renderMenuItemChildren={option => (
                                                    <div>
                                                        {option}
                                                    </div>
                                                )}
                                                placeholder={stateRouteStartAddress.placeholder}
                                            />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            End address
                                        </Col>
                                        <Col smOffset={0} sm={9}>
                                            <AsyncTypeahead
                                                {...stateRouteEndAddress}
                                                onSearch={(query) => { this.onSearch('routeEndAddress', query) }}
                                                filterBy={this.filterByCallback}
                                                onChange={(options) => this.onRouteFormChange('routeEndAddress', options)}
                                                renderMenuItemChildren={option => (
                                                    <div>
                                                        {option}
                                                    </div>
                                                )}
                                                placeholder={stateRouteEndAddress.placeholder}
                                            />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Start time
                                        </Col>
                                        <Col smOffset={0} sm={7}>
                                            <DateTimeField
                                                inputFormat='YYYY/MM/DD - HH:mm:ss A'
                                                dateTime={stateRouteStartTime.value}
                                                onChange={(e) => this.onRouteFormChange('routeStartTime', e)}
                                            />
                                            <FormControl.Feedback />
                                            <HelpBlock></HelpBlock>
                                        </Col>
                                        <Col smOffset={0} sm={2}>
                                            <Button bsSize='xsmall' bsStyle='info' onClick={this.onAddRoute}>
                                                <Glyphicon glyph='glyphicon glyphicon-plus' />
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup bsSize='sm'>
                                        <Col smOffset={0} sm={12}>
                                            <Panel collapsible defaultExpanded header='Routes.....'>
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
