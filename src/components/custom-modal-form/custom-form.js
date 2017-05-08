import React from 'react';
import InputControl from './custom-form-control';

export default class ProductFormModal extends React.Component {
    constructor(props) {
        super(props);

        // Form properties

        // 1. Action (create | read | update | delete)
        this.action = this.props.action;

        // 2. Default null state
        this.product = {};
        this.defaultFormData = {
            id: '',
            name: '',
            price: 0
        };

        // 3. Set formOption
        this.formOption = this.props.formOption;

        // 4. Base on action, decide the initial state of form data
        if (this.action === 'create') {
            console.log(`Form-Modal: action = create`);
            Object.assign(this.product, this.defaultFormData);
        } else if (this.action === 'update') {
            console.log(`Form-Modal: action = update`);
            Object.assign(this.product, this.props.product);
        } else if (this.action === 'read') {
            console.log(`Form-Modal: action = read`);
            Object.assign(this.product, this.props.product);
        } else if (this.action === 'delete') {
            console.log(`Form-Modal: action = delete`);
            Object.assign(this.product, this.props.product);
        } else {
            console.error(`Form-Modal: Action is invalid. Please choose either (create | read | update | delete)`);
            Object.assign(this.product, this.defaultFormData);
        }
    }

    // Handle when form data changed
    updateControlValue = (field, controlValue, isControlValueValid) => {
        this.product[field] = controlValue;

        // Copy property from current state to outside 
        Object.assign(this.props.product, this.product);
    }

    checkAction = () => {
        if (this.action === 'create') {
            // Find status
            return false;
        }
        return true;
    }

    render() {
        if (this.action === 'delete') {
            return (
                <div></div>
            );
        } else {
            console.log(`Render action: ${this.action}`);

            return (
                <form>
                    <InputControl data={this.formOption["id"].data} option={this.formOption["id"].option} />
                    <InputControl data={this.formOption["name"].data} option={this.formOption["name"].option} />
                    <InputControl data={this.formOption["price"].data} option={this.formOption["price"].option} />
                </form>
            );
        }
    }
}
