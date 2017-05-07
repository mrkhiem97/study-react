import React from 'react'
import * as BSReact from 'react-bootstrap';

export class BSTCloseButton extends React.Component {
    render() {
        return (
            <BSReact.Button onClick={this.props.onClick}>Close</BSReact.Button>
        );
    }
}

export class BSTSaveButton extends React.Component {
    render() {
        return (
            <BSReact.Button onClick={this.props.onClick} bsStyle="primary">Save changes</BSReact.Button>
        );
    }
}


export class BSTViewButton extends React.Component {
    render() {
        return (
            <BSReact.Button bsStyle="info">View</BSReact.Button>
        );
    }
}

export class BSTEditButton extends React.Component {
    render() {
        return (
            <BSReact.Button bsStyle="warning">Edit</BSReact.Button>
        );
    }
}

export class BSTDeleteButton extends React.Component {
    handleDeleteBtnClick = () => {
        console.debug(`Call delete`);
        this.props.onClick(this.props.itemId);
    }

    render() {
        return (
            <BSReact.Button onClick={this.handleDeleteBtnClick} bsStyle="danger">Delete</BSReact.Button>
        );
    }
}

export class BSTModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const modalHeader = this.props.header;
        const modalFooter = this.props.footer;
        return (
            <div className="static-modal modal-content">

                <BSReact.Modal.Header>
                    <BSReact.Modal.Title>{modalHeader}</BSReact.Modal.Title>
                </BSReact.Modal.Header>

                <BSReact.Modal.Body>
                    {this.props.children}
                </BSReact.Modal.Body>

                <BSReact.Modal.Footer>
                    {modalFooter}
                </BSReact.Modal.Footer>
            </div>
        );
    }
}

export class BSTActionConstants {
    static ACTION = 'actions';
    static ACTION_VIEW = 'view';
    static ACTION_EDIT = 'edit';
    static ACTION_DELETE = 'delete';
}