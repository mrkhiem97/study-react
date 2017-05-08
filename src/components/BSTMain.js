import React from 'react';
import * as RB from 'react-bootstrap';
import * as CustomModal from './custom-modal-form/custom-modal';
import BSTExtend from './BSTExtend.js';

/* Main table */
export default class BSTMain extends React.Component {
    constructor(props) {
        super(props);
        this.products = this.getProducts();
        this.state = {
            data: this.products
        };
    }

    getProducts() {
        var products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }, {
            id: 3,
            name: "Product3",
            price: 1000
        }];
        return products;
    }

    filterNumber(targetVal, filterVal, comparator) {
        let valid = true;
        switch (comparator) {
            case '=': {
                if (targetVal !== filterVal) {
                    valid = false;
                }
                break;
            }
            case '>': {
                if (targetVal <= filterVal) {
                    valid = false;
                }
                break;
            }
            case '<=': {
                if (targetVal > filterVal) {
                    valid = false;
                }
                break;
            }
            default: {
                console.error('Number comparator provided is not supported');
                break;
            }
        }
        return valid;
    }

    filterText(targetVal, filterVal) {
        if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
            return false;
        }

        return true;
    }

    // Handle when table filter changed
    onFilterChange = (filterObj) => {
        if (Object.keys(filterObj).length === 0) {
            this.setState({
                data: this.products
            });
            return;
        }

        console.debug(JSON.stringify(filterObj));
        const data = this.products.filter((product) => {
            let valid = true;
            let filterValue;

            for (const key in filterObj) {
                const targetValue = product[key];

                console.debug(`Key: ${key} - Value: ${targetValue} - Type: ${filterObj[key].type}`);
                switch (filterObj[key].type) {
                    case 'NumberFilter': {
                        filterValue = filterObj[key].value.number;
                        valid = this.filterNumber(targetValue, filterValue, filterObj[key].value.comparator);
                        break;
                    }
                    default: {
                        filterValue = (typeof filterObj[key].value === 'string') ?
                            filterObj[key].value.toLowerCase() : filterObj[key].value;
                        valid = this.filterText(targetValue, filterValue);
                        break;
                    }
                }

                if (!valid) {
                    break;
                }
            }
            return valid;
        });
        this.setState({
            data: data
        });
    }

    // Handle add new item
    handleAddAction = (product) => {
        console.log(`Data to be added: ${JSON.stringify(product)}`);
        this.setState((state) => {
            state.data = state.data.concat([product]);
            return state;
        });
    }

    // Handle edit item
    handleEditAction = (product) => {
        console.log(`Data to be edited: ${JSON.stringify(product)}`);
        var tempData = this.state.data.slice();

        tempData.forEach((item) => {
            if (item.id === product.id) {
                Object.assign(item, product);
                return;
            }
        });

        this.setState({ data: tempData });
    }

    // Handle delete item
    handleDeleteAction = (itemId) => {
        console.log(`Delete item id: ${itemId}`);
        const data = this.state.data.filter((product) => {
            return product.id != itemId;
        });

        console.log(`Data after deleted: ${JSON.stringify(data)}`);
        this.setState({
            data: data
        });
    }

    // Render
    render() {
        return (
            <div>
                <CustomModal.ProductAddModal handleAddAction={this.handleAddAction} />
                <BSTExtend
                    handleDeleteAction={this.handleDeleteAction}
                    handleEditAction={this.handleEditAction}
                    onFilterChange={this.onFilterChange.bind(this)}
                    { ...this.state } />
            </div>
        );
    }
}
