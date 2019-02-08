import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import TasksStore from "./TasksStore";

const CHANGE_EVENT = 'change';

let _taskLists = [];
let _error = null;
let _taskListTitle = '';

function formatTaskList(data) {
    return {
        id   : data.id,
        name : data.title
    };
}

const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
    getTaskLists() {
        return _taskLists;
    },

    getTaskListsTitle() {
        return _taskListTitle;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
            _taskLists = action.items.map(formatTaskList);

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LISTS_LOAD_FAIL: {
            _taskLists = [];
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_SUCCESS: {
            const newTaskList = formatTaskList(action.taskList);
            _taskLists.push(newTaskList);

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_FAIL: {
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
            const updatedTaskListIndex = _taskLists.findIndex(tasklist => tasklist.id === action.taskListId);
            _taskLists[updatedTaskListIndex] = formatTaskList(action.taskList);
            _taskListTitle = _taskLists[updatedTaskListIndex].name;

            TaskListsStore.emitChange();
            break;
        }

        // case AppConstants.TASK_LIST_UPDATE_REQUEST: {
        //     if (action.taskListTitle) {
        //         _taskListTitle = action.taskListTitle;
        //     }
        //
        //     TaskListsStore.emitChange();
        //     break;
        // }

        case AppConstants.TASK_LIST_TITLE_LOAD_SUCCESS: {
            _taskListTitle = action.taskListTitle;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_DELETE_SUCCESS: {
            const deletedTaskListIndex = _taskLists.findIndex(tasklist => tasklist.id === action.taskListId);
            _taskLists.splice(deletedTaskListIndex, 1);

            TaskListsStore.emitChange();
            break;
        }

        default: {
        }
    }
});

export default TaskListsStore;