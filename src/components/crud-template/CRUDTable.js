import React from 'react';
import * as ReactBST from 'react-bootstrap-table';
import * as CustomBSTComponents from './custom-table-components/custom-table-components.js';
import * as CustomModal from './custom-modal-form/custom-modal';
import { BSTValidatorHelper } from './custom-validators/custom-validator.js'

const BootstrapTable = ReactBST.BootstrapTable;
const TableHeaderColumn = ReactBST.TableHeaderColumn;

/* BST Table */
export default class CRUDTable extends React.Component {

    // View column
    createViewColumn = (cell, row, formatExtraData) => {
        const products = this.props.data.filter((product) => {
            return product.id === row.id;
        });
        return (
            <CustomModal.ProductDetailModal product={products[0]} />
        );
    }

    // Edit column
    createEditColumn = (cell, row, formatExtraData) => {
        const products = this.props.data.filter((product) => {
            return product.id === row.id;
        });

        return (
            <CustomModal.ProductEditModal product={products[0]} handleEditAction={this.props.handleEditAction} />
        );
    }

    // Delete column
    createDeleteColumn = (cell, row, formatExtraData) => {
        const products = this.props.data.filter((product) => {
            return product.id === row.id;
        });

        return (
            <CustomModal.ProductDeleteModal product={products[0]} handleDeleteAction={this.props.handleDeleteAction} />
        );
    }

    render() {
        const options = {
            onFilterChange: this.props.onFilterChange,
        };

        return (
            <BootstrapTable data={this.props.data} remote={true} options={options} striped>
                <TableHeaderColumn row="0" rowSpan="2" dataField="id" isKey={true}>Product ID</TableHeaderColumn>
                <TableHeaderColumn row="0" rowSpan="2" dataField="name" editable={{ validator: BSTValidatorHelper.validatateProductName }}
                    filter={{ type: 'TextFilter' }}>Product Name</TableHeaderColumn>
                <TableHeaderColumn row="0" rowSpan="2" dataField="price"
                    filter={{
                        type: 'NumberFilter',
                        numberComparators: ['=', '>', '<=']
                    }}>
                    Product Price
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