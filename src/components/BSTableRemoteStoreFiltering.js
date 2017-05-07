import React from 'react';
import * as RB from 'react-bootstrap';
import ModalProduct from './custom-modal-form/custom-modal.js'
import RemoteFiltering from './BSTableRemoteFiltering'

class BSTableRemoteStoreFiltering extends React.Component {
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

    onFilterChange(filterObj) {
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

    // Click delete button
    handleDeleteBtnClick = (itemId) => {
        console.log(`Delete ${itemId}`);
        const data = this.products.filter((product) => {
            return product.id != itemId;
        });

        this.products = data;
        console.log(`Data size: ${data.length}`);
        this.setState({
            data: data
        });
    }

    render() {
        return (
            <div>
                <ModalProduct />

                <RemoteFiltering onFilter handleDeleteBtnClick={this.handleDeleteBtnClick} onFilterChange={this.onFilterChange.bind(this)} { ...this.state } />
            </div>
        );
    }
}

export default BSTableRemoteStoreFiltering;