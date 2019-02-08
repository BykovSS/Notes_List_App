import React from 'react';

import TasksActions from '../actions/TasksActions';
import TaskListsActions from '../actions/TaskListsActions';
import TasksStore from '../stores/TasksStore';
import TaskListsStore from '../stores/TaskListsStore';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';
import TaskListDeleteModal from '../components/TaskListDeleteModal.jsx';

const ENTER_KEY = 13;
const ESC_KEY = 27;

function getStateFromFlux() {
    return {
        taskListTitle: TaskListsStore.getTaskListsTitle(),
        tasks: TasksStore.getTasks(),
        error: TasksStore.getError(),
        isLoadingTasks: TasksStore.isLoadingTasks()
    };
}

class TasksPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign(
            {},
            getStateFromFlux(),
            {isCreatingTask: false, isUpdatingTitleTasklist: false, isConfirmDeletion: false});
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleDeleteTasklist = this.handleDeleteTasklist.bind(this);
        this.handleConfirmDeleteTasklist = this.handleConfirmDeleteTasklist.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleUpdateTasklist = this.handleUpdateTasklist.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.saveTaskList = this.saveTaskList.bind(this);
        this.cancelTaskList = this.cancelTaskList.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        TasksActions.loadTasks(this.props.match.params.id);
        TaskListsActions.getTaskListTitle({taskListId: this.props.match.params.id});
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
        TaskListsStore.addChangeListener(this._onChange);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            TaskListsActions.getTaskListTitle({taskListId: nextProps.match.params.id});
            TasksActions.loadTasks(nextProps.match.params.id);
        }
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
        TaskListsStore.removeChangeListener(this._onChange);
    }

    handleStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.match.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    }

    handleTaskUpdate(taskId, {text, notes, due}) {
        let Args = {
            taskListId: this.props.match.params.id,
            taskId: taskId,
            text: text,
            notes: notes
        };
        if (due) {
            Args.due = due;
        }
        TasksActions.updateTask(Args);
    }

    handleTaskDelete(taskId) {
        TasksActions.deleteTask({
            taskListId: this.props.match.params.id,
            taskId: taskId
        })
    }

    handleAddTask() {
        this.setState({ isCreatingTask : true });
    }

    handleUpdateTasklist() {
        this.setState({ isUpdatingTitleTasklist : true });
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTaskList(e.target.value);
        }

        else if (e.keyCode === ESC_KEY) {
            this.cancelTaskList();
        }
    }

    saveTaskList(title) {
        TaskListsActions.updateTaskList({taskListId: this.props.match.params.id, title: title});
        this.setState({ isUpdatingTitleTasklist : false });
    }

    cancelTaskList() {
        this.setState({ isUpdatingTitleTasklist : false });
    }

    handleDeleteTasklist(taskListId) {
        TaskListsActions.deleteTaskList({taskListId: taskListId});
        this.handleCloseDelete();
        this.props.history.push('/lists');
    }

    handleConfirmDeleteTasklist() {
        this.setState({ isConfirmDeletion : true });
    }

    handleCloseDelete() {
        this.setState({ isConfirmDeletion : false });
    }

    handleClose() {
        this.setState({ isCreatingTask : false });
    }

    handleTaskSubmit(task) {
        const taskListId = this.props.match.params.id;

        TasksActions.createTask({ taskListId, ...task });

        this.setState({ isCreatingTask : false });
    }

    render() {
        return (
            <div>
                <TasksPage
                    isUpdatingTitleTasklist={this.state.isUpdatingTitleTasklist}
                    isLoadingTasks={this.state.isLoadingTasks}
                    taskListTitle={this.state.taskListTitle}
                    onKeyDown={this.handleKeyDown}
                    onUpdateTaskList={this.handleUpdateTasklist}
                    onConfirmDeleteTasklist={this.handleConfirmDeleteTasklist}
                    onUpdateTasklist={this.handleUpdateTasklist}
                    onAddTask={this.handleAddTask}
                    tasks={this.state.tasks}
                    error={this.state.error}
                    onStatusChange={this.handleStatusChange}
                    onUpdateValues={this.handleTaskUpdate}
                    onDelete={this.handleTaskDelete}
                />
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleClose}
                />
                <TaskListDeleteModal
                    isOpen={this.state.isConfirmDeletion}
                    name={this.state.taskListTitle}
                    onConfirm={this.handleDeleteTasklist.bind(null, this.props.match.params.id)}
                    onClose={this.handleCloseDelete}
                />
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

export default TasksPageContainer;