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
            data: this.journeys.slice(0, 2),
            totalDataSize: this.journeys.length,
            sizePerPage: 2,
            currentPage: 1
        };
    }

    onPageChange = (page, sizePerPage) => {
        const currentIndex = (page - 1) * sizePerPage;
        this.setState({
            data: this.journeys.slice(currentIndex, currentIndex + sizePerPage),
            currentPage: page
        });
    }

    onSizePerPageList = (sizePerPage) => {
        const currentIndex = (this.state.currentPage - 1) * sizePerPage;
        this.setState({
            data: this.journeys.slice(currentIndex, currentIndex + sizePerPage),
            sizePerPage: sizePerPage
        });
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

        const newState = this.state.data.concat([entity]);
        console.log(`New state: ${JSON.stringify(newState)}`);

        this.setState({
            data: newState
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
        console.log(`Re-render outside: ${JSON.stringify(this.state.data)}`);
        return (
            <div>
                <CreateJourneyModal handleAddAction={this.handleAddAction} />
                <CRUDTable
                    handleDeleteAction={this.handleDeleteAction}
                    handleEditAction={this.handleEditAction}
                    onPageChange={this.onPageChange}
                    onSizePerPageList={this.onSizePerPageList}
                    onFilterChange={this.onFilterChange}
                    { ...this.state } />
            </div>
        );
    }
}
