export class BSTValidatorHelper {
    static validatateProductName = (value) => {
        const REGEX = /\w+/;
        const isMatch = REGEX.test(value);

        if (!isMatch) {
            return 'Product name is not valid';
        }

        return true;
    };

}