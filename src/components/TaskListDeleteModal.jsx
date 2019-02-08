import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class TaskListDeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: this.props.isOpen};
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleClose() {
        const { onClose } = this.props;

        if (onClose) {
            onClose();
        }
    }

    handleConfirm() {
        const { onConfirm } = this.props;

        if (onConfirm) {
            onConfirm();
        }
    }

    render() {
        const { isOpen } = this.props;
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

        return (
            <div>
                <Dialog
                    className='TaskListCreateModal'
                    open={isOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle className='TaskListCreateModal__modal-title'>Confirm the deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to remove tasklist <span className="TaskListDeleteModal__name">{this.props.name}</span>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirm} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TaskListDeleteModal;
