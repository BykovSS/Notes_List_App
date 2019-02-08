import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TaskListCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name : '', isOpen: this.props.isOpen};
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleClose() {
        const { onClose } = this.props;

        this.setState({ name: ''});

        if (onClose) {
            onClose();
        }
    }

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                name: this.state.name
            });
        }

        this.setState({ name: ''});
    }

    handleTextChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        const { name } = this.state;
        const { isOpen } = this.props;
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

        return (
            <div>
                <Dialog
                    className='TaskListCreateModal'
                    open={isOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle className='TaskListCreateModal__modal-title'>Add task list</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            ref={c => this.taskInput = c}
                            value={name}
                            onChange={this.handleTextChange}
                            helperText='e.g. movies to watch'
                            label="Enter task list name"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" disabled={!name}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TaskListCreateModal;
