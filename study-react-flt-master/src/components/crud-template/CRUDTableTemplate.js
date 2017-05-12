import React from 'react';
import { CreateJourneyModal } from './modal-form/crud-modal';
import StoreHelper from './helpers/StoreHelper';
import CRUDTable from './CRUDTable';

/* Main table */
export default class CRUDTableTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.journeys = StoreHelper.findAllJourneys();
        this.state = {
            data: this.journeys
        };
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
                data: this.journeys
            });
            return;
        }

        console.debug(`Filter structure: ${JSON.stringify(filterObj)}`);
        const data = this.journeys.filter((item) => {
            let valid = true;
            let filterValue;

            for (const key in filterObj) {
                const targetValue = item[key];

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
    handleAddAction = (entity) => {
        console.log(`Data to be added: ${JSON.stringify(entity)}`);
        this.setState((state) => {
            state.data = state.data.concat([entity]);
            return state;
        });
    }

    // Handle edit item
    handleEditAction = (entity) => {
        console.log(`Data to be edited: ${JSON.stringify(entity)}`);
        var tempData = this.state.data.slice();

        tempData.forEach((item) => {
            if (item.id == entity.id) {

                Object.assign(item, entity);
                return;
            }
        });

        this.setState({ data: tempData });
    }

    // Handle delete item
    handleDeleteAction = (entity) => {
        console.log(`Delete item id: ${entity.id}`);
        const data = this.state.data.filter((item) => {
            return item.id != entity.id;
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
                <CreateJourneyModal handleAddAction={this.handleAddAction} />
                <CRUDTable
                    handleDeleteAction={this.handleDeleteAction}
                    handleEditAction={this.handleEditAction}
                    onFilterChange={this.onFilterChange}
                    { ...this.state } />
            </div>
        );
    }
}
