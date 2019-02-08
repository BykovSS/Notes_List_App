import React from 'react';
import moment from 'moment';

import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Delete from '@material-ui/icons/Delete';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import MoreVert from '@material-ui/icons/MoreVert';

import './Task.scss';
import TextField from "@material-ui/core/TextField";

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isEditing: false, anchorEl: null};
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.cancelTask = this.cancelTask.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    handleEdit(e) {
        this.setState({ isEditing: true }, this.focusInput);
        this.setState({ anchorEl: null });
    }

    handleDelete() {
        this.deleteTask();
    }

    handleCancel() {
        this.cancelTask();
        this.setState({ anchorEl: null });
    }

    handleSave() {
        this.saveTask();
    }

    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    }

    focusInput() {
        this.input.focus();
    }

    saveTask() {
        if (this.due) {
            this.props.onUpdateValues({ text: this.input.value, notes: this.note.value, due: this.due.value });
        }
        else {
            this.props.onUpdateValues( {text: this.input.value, notes: this.note.value} );
        }


        this.setState({ isEditing: false });
    }

    deleteTask() {
        this.props.onDelete();
        this.setState({ isEditing: false });
    }

    cancelTask() {
        this.setState({ isEditing: false });
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    render() {
        let {anchorEl} = this.state;
        let open = Boolean(anchorEl);
        const due = this.props.due ? (new Date(this.props.due)).toISOString() : '';
        return (
            this.state.isEditing
            ?
                <div className='Task editing'>
                    <input
                        className='Task__text-input'
                        type='text'
                        defaultValue={this.props.text}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.input = c}
                    />
                    <textarea
                        className='Task__note-input'
                        defaultValue={this.props.descr}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.note = c}
                    />
                    {
                        !this.props.isCompleted
                            ?
                            <input
                                className='Task__text-input'
                                defaultValue={due.substring(0, due.indexOf('T'))}
                                type="date"
                                ref={c => this.due = c}
                            />
                            :
                            null
                    }
                    <div className='Task__toolbar'>
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleSave}>
                                Save
                            </Button>
                            <Button
                                onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            :
                <div className='Task'>
                    <Checkbox
                        className='Task__checkbox'
                        checked={this.props.isCompleted}
                        onChange={this.handleCheck}
                        color = "primary"
                    />

                    <div className='Task__text' onClick={this.handleEdit}>
                        <div className='Task__title'>
                            {this.props.text}
                            {
                                this.props.descr
                                    ?
                                    <span title={this.props.descr}>
                                        <SpeakerNotes className='Task__note' />
                                    </span>
                                    :
                                    null
                            }
                        </div>
                        {
                            this.props.due
                                ?
                                <div className='Task__due'>
                                    {'due ' + moment(this.props.due).fromNow()}
                                </div>
                                :
                                null
                        }
                    </div>

                    <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVert/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                    </Menu>
                </div>
        )
    }
}

export default Task;
