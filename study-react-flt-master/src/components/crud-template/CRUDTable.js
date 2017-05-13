import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as CustomBSTComponents from './custom-table-components/custom-table-components.js';
import { DeleteJourneyModal, EditJourneyModal, ViewJourneyModal } from './modal-form/crud-modal';
import moment from 'moment';

/* BST Table */
export default class CRUDTable extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(React.PropTypes.shape({
            id: PropTypes.number,
            journeyName: PropTypes.string.isRequired,
            estimateStartTime: PropTypes.number.isRequired,
            estimateEndTime: PropTypes.number.isRequired,
        })).isRequired,
    }

    static defaultProps = {
        data: []
    };

    dateFormatter = (cell, row) => {
        return moment(cell).format('YYYY/MM/DD - HH:mm:ss A');
    }

    // View column
    createViewColumn = (cell, row, formatExtraData) => {
        const entities = this.props.data.filter((item) => {
            return item.id === row.id;
        });

        return (
            <ViewJourneyModal entity={entities[0]} />
        );
    }

    // Edit column
    createEditColumn = (cell, row, formatExtraData) => {
        const entities = this.props.data.filter((item) => {
            return item.id === row.id;
        });

        return (
            <EditJourneyModal entity={entities[0]} handleEditAction={this.props.handleEditAction} />
        );
    }

    // Delete column
    createDeleteColumn = (cell, row, formatExtraData) => {
        const entities = this.props.data.filter((item) => {
            return item.id === row.id;
        });

        return (
            <DeleteJourneyModal entity={entities[0]} handleDeleteAction={this.props.handleDeleteAction} />
        );
    }

    render() {
        const options = {
            onFilterChange: this.props.onFilterChange,
            sizePerPage: this.props.sizePerPage,
            onPageChange: this.props.onPageChange,
            sizePerPageList: [5, 10],
            page: this.props.currentPage,
            onSizePerPageList: this.props.onSizePerPageList
        };

        return (
            <BootstrapTable
                data={this.props.data}
                pagination={true}
                remote={true}
                striped={true}
                options={options}
                fetchInfo={{ dataTotalSize: this.props.totalDataSize }}
            >
                <TableHeaderColumn row="0" rowSpan="2" dataField="id" isKey={true} width="100">Journey ID</TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="journeyName" filter={{ type: 'TextFilter' }}>
                    Journey name
                </TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="estimateStartTime" dataFormat={this.dateFormatter}>
                    {/*filter={{
                        type: 'NumberFilter',
                        numberComparators: ['=', '>', '<=']
                    }}*/}
                    Estimate end time
                </TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="estimateEndTime" dataFormat={this.dateFormatter}>
                    {/*filter={{
                        type: 'NumberFilter',
                        numberComparators: ['=', '>', '<=']
                    }}>*/}
                    Estimate start time
                </TableHeaderColumn>

                <TableHeaderColumn row="0" colSpan="3" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION}>Actions</TableHeaderColumn>
                <TableHeaderColumn row="1" width="60" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_VIEW} dataFormat={this.createViewColumn}>
                    View
                </TableHeaderColumn>
                <TableHeaderColumn row="1" width="50" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_EDIT} dataFormat={this.createEditColumn}>
                    Edit
                </TableHeaderColumn>
                <TableHeaderColumn row="1" width="70" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_DELETE} dataFormat={this.createDeleteColumn}>
                    Delete
                </TableHeaderColumn>
            </BootstrapTable >
        );
    }
}