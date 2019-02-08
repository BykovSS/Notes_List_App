import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
    loadTasks(taskListId) {
        AppDispatcher.dispatch({
            type  : AppConstants.TASKS_LOAD_REQUEST
        });
        api.listTasks(taskListId)
        .then(data => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASKS_LOAD_SUCCESS,
                items : data.items || []
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASKS_LOAD_FAIL,
                error : err
            });
        });
    },

    updateTaskStatus(params) {
        AppDispatcher.dispatch({
            type   : AppConstants.TASK_UPDATE_REQUEST,
            taskId : params.taskId,
            isCompleted : params.isCompleted
        });
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    updateTask(params) {
        AppDispatcher.dispatch({
            type: AppConstants.TASK_UPDATE_REQUEST,
            taskId: params.taskId,
            text: params.text
        });
        let Args = {
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.text,
            notes: params.notes
        };
        if (params.due) {
            Args.due = (new Date(params.due)).toISOString();
        }
        api.updateTask(Args)
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    createTask(params) {
        const args = {
            taskListId: params.taskListId,
            title: params.text,
            notes: params.descr
        };
        if (params.due) args.due = (new Date(params.due)).toISOString();
        api.insertTask(args)
        .then(data => {
            AppDispatcher.dispatch({
                type : AppConstants.TASK_CREATE_SUCCESS,
                task : data
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_CREATE_FAIL,
                error : err
            });
        });
    },

    deleteTask(params) {
        api.deleteTask({
            taskListId: params.taskListId,
            taskId: params.taskId
        })
        .then(data => {
            AppDispatcher.dispatch({
                type: AppConstants.TASK_DELETE_SUCCESS,
                task   : data,
                taskId: params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_DELETE_FAIL,
                error : err
            });
        });
    }
};

export default TasksActions;
