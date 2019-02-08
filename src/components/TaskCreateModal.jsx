import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TaskCreateModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {text: '', descr: '', due: ''};
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleDescrChange = this.handleDescrChange.bind(this);
        this.handleDueChange = this.handleDueChange.bind(this);
    }

    handleClose() {
        const { onClose } = this.props;

        this.setState({text: '', descr: '', due: ''});

        if (onClose) {
            onClose();
        }
    }

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                text: this.state.text,
                descr: this.state.descr,
                due: this.state.due
            });
        }

        this.setState({text: '', descr: '', due: ''});
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleDescrChange(e) {
        this.setState({
            descr: e.target.value
        });
    }

    handleDueChange(e) {
        this.setState({
            due: e.target.value
        });
    }

    render() {
        const { text, descr, due } = this.state;
        const { isOpen } = this.props;

        return (
            <Dialog
                className='TaskCreateModal'
                open={isOpen}
                onClose={this.handleClose}
            >
                <DialogTitle className='TaskCreateModal__modal-title'>Add task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        ref={c => this.taskInput = c}
                        value={text}
                        onChange={this.handleTextChange}
                        helperText='e.g. buy a bottle of milk'
                        label="Enter task title"
                        fullWidth
                    />
                    <TextField
                        value={descr}
                        onChange={this.handleDescrChange}
                        helperText='description of this note'
                        label="Enter task description"
                        fullWidth
                    />
                    <TextField
                        value={due}
                        type="date"
                        onChange={this.handleDueChange}
                        helperText='data due of this note'
                        // label="Enter task data due"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" disabled={!text}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default TaskCreateModal;
