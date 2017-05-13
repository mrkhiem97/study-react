export class JourneyValidatorHelper {
    // status: success - warning - error

    // Validate product id
    static validatateJourneyId = (value) => {
        const REGEX = /^\d+$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Journey id is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }

    // Validate product name
    static validatateJourneyName = (value) => {
        const REGEX = /\w+/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Journey name is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }

    // Validate product price
    static validatateJourneyDateTime = (value) => {
        const REGEX = /^\d+(\.\d+)?$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Journey date is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }

    // Validate product price
    static validatateOther = (value) => {
        const REGEX = /^\d+(\.\d+)?$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Other is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }
}