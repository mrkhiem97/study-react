export class BSTValidatorHelper {
    // status: success - warning - error

    // Validate product id
    static validatateProductId = (value) => {
        const REGEX = /^\d+$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product id is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }

    // Validate product name
    static validatateProductName = (value) => {
        const REGEX = /\w+/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product name is not valid', valid: false };
        }

        return { status: 'success', message: '', valid: true };
    }

    // Validate product price
    static validatateProductPrice = (value) => {
        const REGEX = /^\d+(\.\d+)?$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product price is not valid', valid: false };
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