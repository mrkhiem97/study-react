export class BSTValidatorHelper {
    // status: success - warning - error

    // Validate product id
    static validatateProductId = (value) => {
        const REGEX = /^\d+$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product id is not valid' };
        }

        return { status: 'success', message: '' };
    }

    // Validate product name
    static validatateProductName = (value) => {
        const REGEX = /\w+/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product name is not valid' };
        }

        return { status: 'success', message: '' };
    }

    // Validate product price
    static validatateProductPrice = (value) => {
        const REGEX = /^\d+(\.\d+)?$/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return { status: 'error', message: 'Product price is not valid' };
        }

        return { status: 'success', message: '' };
    }
}