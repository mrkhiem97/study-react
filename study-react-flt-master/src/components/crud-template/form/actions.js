import { GoogleMapClient } from '../../libraries/GoogleMapClient';

export function createChangeControlValueAction(field, value) {
    return {
        type: 'CHANGE_CONTROL_VALUE',
        field: field,
        value: value
    }
}

export function createChangeRouteControlValueAction(field, options) {
    return {
        type: 'CHANGE_ROUTE_CONTROL_VALUE',
        field: field,
        options: options
    }
}

export function createSearchRouteAction(field, locationResults) {
    return {
        type: 'SEARCH_ROUTE',
        locationResults,
        field
    }
}

export function createSearchRouteActionAsyn(field, query) {
    return (dispatch) => {
        GoogleMapClient.findByAddress(query).then(locationResults => {
            dispatch(createSearchRouteAction(field, locationResults));
        });
    }
}

export function createAddRouteAction() {
    return {
        type: 'ADD_ROUTE',
    }
}

export function createForceValidateAction() {
    return {
        type: 'FORCE_VALIDATE',
    }
}

export function createInitialStateAction(initialState) {
    return {
        type: 'CREATE_INITIAL_STATE',
        initialState
    }
}