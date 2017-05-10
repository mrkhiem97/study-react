import React from 'react';
import * as CustomModal from './custom-modal-form/custom-modal';
import StoreHelper from './helpers/StoreHelper';
import CRUDTable from './CRUDTable';

/* Main table */
export default class CRUDTableTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.products = StoreHelper.findAllProducts();
        this.state = {
            data: this.products
        };

        this.count = 0;
    }

    // Filter number
    filterNumber = (targetVal, filterVal, comparator) => {
        let valid = true;
        
        switch (comparator) {
            case '=': {
                if (targetVal != filterVal) {
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

    // Filter text
    filterText = (targetVal, filterVal) => {
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

        console.debug(`Filter structure: ${JSON.stringify(filterObj)}`);
        const data = this.products.filter((product) => {
            let valid = true;
            let filterValue;

            for (const key in filterObj) {
                const targetValue = product[key];

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

        console.debug(`Count: ${this.count}`);
        this.count = 0;
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
            if (item.id == product.id) {

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
                <CustomModal.JourneyAddModal handleAddAction={this.handleAddAction} />
                <CRUDTable
                    handleDeleteAction={this.handleDeleteAction}
                    handleEditAction={this.handleEditAction}
                    onFilterChange={this.onFilterChange.bind(this)}
                    { ...this.state } />
            </div>
        );
    }
}
