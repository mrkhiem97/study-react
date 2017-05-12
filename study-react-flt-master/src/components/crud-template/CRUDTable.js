import React from 'react';
import * as ReactBST from 'react-bootstrap-table';
import * as CustomBSTComponents from './custom-table-components/custom-table-components.js';
import { DeleteJourneyModal, EditJourneyModal, ViewJourneyModal } from './modal-form/crud-modal'
import moment from 'moment';

const BootstrapTable = ReactBST.BootstrapTable;
const TableHeaderColumn = ReactBST.TableHeaderColumn;

/* BST Table */
export default class CRUDTable extends React.Component {

    dateFormatter = (cell, row) => {
        return `${moment(cell).format('YYYY/MM/DD - HH:mm:ss A')}`;
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
        };

        return (
            <BootstrapTable data={this.props.data} remote={true} options={options} striped>
                <TableHeaderColumn row="0" rowSpan="2" dataField="id" isKey={true} width={100}>Journey ID</TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="journeyName" filter={{ type: 'TextFilter' }}>
                    Journey name
                </TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="estimateStartTime" dataFormat={this.dateFormatter}
                    filter={{
                        type: 'NumberFilter',
                        numberComparators: ['=', '>', '<=']
                    }}>
                    Estimate end time
                </TableHeaderColumn>

                <TableHeaderColumn row="0" rowSpan="2" dataField="estimateEndTime" dataFormat={this.dateFormatter}
                    filter={{
                        type: 'NumberFilter',
                        numberComparators: ['=', '>', '<=']
                    }}>
                    Estimate start time
                </TableHeaderColumn>

                <TableHeaderColumn row="0" colSpan="3" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION}>Actions</TableHeaderColumn>
                <TableHeaderColumn row="1" width="70" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_VIEW} dataFormat={this.createViewColumn}>
                    View
                </TableHeaderColumn>
                <TableHeaderColumn row="1" width="65" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_EDIT} dataFormat={this.createEditColumn}>
                    Edit
                </TableHeaderColumn>
                <TableHeaderColumn row="1" width="75" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_DELETE} dataFormat={this.createDeleteColumn}>
                    Delete
                </TableHeaderColumn>
            </BootstrapTable >
        );
    }
}