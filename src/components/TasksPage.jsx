import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Update from '@material-ui/icons/Update';
import CircularProgress from '@material-ui/core/CircularProgress';

import './TasksPage.scss';

import Task from './Task.jsx';

class TasksPage extends React.Component {
    renderTasks() {
        return (
            <div className='TasksPage__tasks'>
                {
                    this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            text={task.text}
                            descr={task.notes}
                            due={task.dueTime}
                            isCompleted={task.isCompleted}
                            onStatusChange={this.props.onStatusChange.bind(null, task.id)}
                            onUpdateValues={this.props.onUpdateValues.bind(null, task.id)}
                            onDelete={this.props.onDelete.bind(null, task.id)}
                        />
                    )
                }
            </div>
        )
    }

    render() {
        // console.log(this.props.taskListTitle);
        if (this.props.error) {
            return (
                <div className="TasksPage">
                    <div className="TasksPage__error">
                        {this.props.error}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='TasksPage'>
                    <div className='TasksPage__header'>
                        {
                            this.props.isUpdatingTitleTasklist
                                ?
                                <input
                                    type="text"
                                    className='TasksPage__input'
                                    defaultValue={this.props.taskListTitle}
                                    onKeyDown={this.props.onKeyDown}
                                    onChange={this.props.onKeyDown}
                                    // ref={c => this.input = c}
                                />
                                :
                                <h2
                                    className='TasksPage__title'
                                    onClick={this.props.onUpdateTaskList}
                                >
                                    {
                                        this.props.isLoadingTasks
                                            ?
                                            ""
                                            :
                                            this.props.taskListTitle
                                    }
                                </h2>
                        }
                        <div className='TasksPage__tools'>
                            <IconButton onClick={this.props.onConfirmDeleteTasklist}>
                                <Delete />
                            </IconButton>
                            <IconButton onClick={this.props.onUpdateTasklist}>
                                <Update />
                            </IconButton>
                            <IconButton onClick={this.props.onAddTask}>
                                <Add />
                            </IconButton>
                        </div>
                    </div>

                    {
                        this.props.isLoadingTasks
                            ?
                            <CircularProgress />
                            :
                            this.renderTasks()

                    }
                </div>
            )
        }
    }
}

export default TasksPage;