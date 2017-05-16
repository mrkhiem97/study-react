export function reducer(state, action) {
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
            formFieldManager.data.value = action.options[0];

            return newState;
        }

        case 'SEARCH_ROUTE': {
            // Create new state
            const newState = {};
            Object.assign(newState, state);
            console.log(`Search routes: ${JSON.stringify(action.locationResults)}`);

            const formFieldManager = newState.subForm[action.field];

            // Clear original array
            formFieldManager.data.options = [];
            action.locationResults.forEach(locationResult => {
                formFieldManager.data.options.push(locationResult.address);
            });

            return newState;
        }

        case 'ADD_ROUTE': {
            // Create new state
            const newState = {};
            Object.assign(newState, state);

            const routeStartAddress = newState.subForm['routeStartAddress'].data.value;
            const routeEndAddress = newState.subForm['routeEndAddress'].data.value;
            const routeStartTime = newState.subForm['routeStartTime'].data.value;
            console.log(`Start address: ${routeStartAddress} - End addess: ${routeEndAddress} - StartTime: ${routeStartTime}`);

            let isInputsValid = true;
            const routeInputArr = [routeStartAddress, routeEndAddress, routeStartTime];
            routeInputArr.forEach((x) => {
                if (x.toString().trim() === '') {
                    isInputsValid = false;
                    return;
                }
            });

            newState.subForm.isFormValidated = isInputsValid;

            if (state.subForm.isFormValidated) {
                const route = {
                    routeStartAddress,
                    routeEndAddress,
                    routeStartTime
                };

                // Add to table
                newState.routes.push(route);
            }
            return newState;
        }

        case 'FORCE_VALIDATE': {
            const newState = {};
            // Create new state
            Object.assign(newState, state);

            let isInputsValid = true;
            for (const field in newState.mainForm) {
                if (field === 'isFormValidated') continue;

                // Do validation base on interface validator
                const formFieldManager = newState.mainForm[field];
                if (formFieldManager.hidden) continue;


                if (formFieldManager.option.validator !== null) {
                    formFieldManager.data.validateStatus = formFieldManager.option.validator(formFieldManager.data.value);
                    isInputsValid &= formFieldManager.data.validateStatus.valid;
                }
            }

            newState.mainForm['isFormValidated'] = isInputsValid;
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