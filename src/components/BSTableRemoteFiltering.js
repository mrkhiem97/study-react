import React from 'react';
import * as ReactBST from 'react-bootstrap-table';
import * as CustomBSTComponents from './custom-table-components/custom-table-components.js'
import { BSTValidatorHelper } from './custom-validators/custom-validator.js'

const BootstrapTable = ReactBST.BootstrapTable;
const TableHeaderColumn = ReactBST.TableHeaderColumn;
const InsertButton = ReactBST.InsertButton;

class CustomInsertModal extends React.Component {

    handleSaveBtnClick = () => {
        const { columns, onSave } = this.props;
        const newRow = {};

        columns.forEach((column, i) => {
            console.debug(`Add Column ${i}: ${JSON.stringify(column)}`);
            if (!column.hiddenOnInsert) {
                newRow[column.field] = this.refs[column.field].value;
            } else {
                newRow[column.field] = undefined;
            }
        }, this);

        // You should call onSave function and give the new row
        console.debug(`Onsave: ${JSON.stringify(onSave)}`);
        onSave(newRow);
    }

    render() {
        const { onModalClose, onSave, columns, validateState, ignoreEditable } = this.props;

        // Create modal header
        const createModalHeader = (
            <div>Add new product</div>
        );

        // Create modal header
        const createModalFooter = (
            <div>
                <CustomBSTComponents.BSTCloseButton onClick={this.props.onModalClose} />
                <CustomBSTComponents.BSTSaveButton onClick={() => this.handleSaveBtnClick(this.props.columns, this.props.onSave)} />
            </div>
        );

        return (
            <CustomBSTComponents.BSTModal header={createModalHeader} footer={createModalFooter}>
                <div>
                    {
                        columns.map((column, i) => {
                            const { editable, format, field, name, hiddenOnInsert } = column;

                            console.debug(`Render column ${i}: ${JSON.stringify(column)}`);
                            if (hiddenOnInsert) {
                                // when you want same auto generate value
                                // and not allow edit, for example ID field
                                return null;
                            }
                            const error = validateState[field] ?
                                (<span className='help-block bg-danger'>{validateState[field]}</span>) :
                                null;
                            return (
                                <div className='form-group' key={field}>
                                    <label>{name} : </label>
                                    <input className="form-control" ref={field} type='text' defaultValue={''} />
                                    {error}
                                </div>
                            );
                        })
                    }
                </div>
            </CustomBSTComponents.BSTModal>
        );
    }
}

class BSTableRemoteFiltering extends React.Component {
    createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };

        return (
            <CustomInsertModal { ...attr } />
        );
    }

    // View column
    createViewColumn = (cell, row, formatExtraData) => {
        return (
            <CustomBSTComponents.BSTViewButton />
        );
    }

    // Edit column
    createEditColumn = (cell, row, formatExtraData) => {
        return (
            <CustomBSTComponents.BSTEditButton />
        );
    }

    // Delete column
    createDeleteColumn = (cell, row, formatExtraData) => {
        console.debug(`rows: ${JSON.stringify(row)}`);
        return (
            <CustomBSTComponents.BSTDeleteButton itemId={row.id} onClick={this.props.handleDeleteBtnClick} />
        );
    }

    render() {
        const options = {
            insertModal: this.createCustomModal,
            onFilterChange: this.props.onFilterChange,
        };

        return (
            <BootstrapTable data={this.props.data} remote={true} options={options}>
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
                <TableHeaderColumn row="1" width="70" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_EDIT} dataFormat={this.createEditColumn}>
                    Edit
                </TableHeaderColumn>
                <TableHeaderColumn row="1" width="80" dataAlign="center" hiddenOnInsert={true} dataField={CustomBSTComponents.BSTActionConstants.ACTION_DELETE} dataFormat={this.createDeleteColumn}>
                    Delete
                </TableHeaderColumn>
            </BootstrapTable >
        );
    }
}


export default BSTableRemoteFiltering;