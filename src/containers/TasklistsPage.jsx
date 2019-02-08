import React from 'react';

import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';

import TaskListCreateModal from '../components/TaskListCreateModal.jsx';
import TasklistsPage from '../components/TasklistsPage.jsx';

function getStateFromFlux() {
    return {
        taskLists: TaskListsStore.getTaskLists()
    };
}

class TasklistsPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, getStateFromFlux(), {isCreatingTaskList: false});
        this.handleAddTaskList = this.handleAddTaskList.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTaskListSubmit = this.handleTaskListSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePushHistory = this.handlePushHistory.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        TaskListsActions.loadTaskLists();
    }

    componentDidMount() {
        TaskListsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TaskListsStore.removeChangeListener(this._onChange);
    }

    handleAddTaskList() {
        this.setState({ isCreatingTaskList : true });
    }

    handleClose() {
        this.setState({ isCreatingTaskList : false });
    }

    handleTaskListSubmit(taskList) {
        TaskListsActions.createTaskList(taskList);

        this.setState({ isCreatingTaskList : false });
    }

    handleLogOut() {
        SessionActions.logout(
            this.props.history.replace('/login')
        );
    }

    handlePushHistory(newPath) {
        if (this.props.history.location.pathname.indexOf(newPath) === -1 || this.props.history.location.pathname.length > newPath.length) {
            this.props.history.push(newPath);
        }
    }

    render() {
        return (
            <div>
                <TasklistsPage
                    taskLists={this.state.taskLists}
                    location={this.props.history.location}
                    onPushHistory={this.handlePushHistory}
                    onAddTaskList={this.handleAddTaskList}
                    onLogOut={this.handleLogOut}
                />
                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit}
                    onClose={this.handleClose}
                />
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

export default TasklistsPageContainer;
