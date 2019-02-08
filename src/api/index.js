// Файл с методами для взаимодействия с API

// Авторизация
import Config from '../config';
let {clientId} = Config;
// const CLIENT_ID = '646180856703-5eepbnk7451u02456gi02f5dg24pp02s.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

export default {
    authorize(params) {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize( // Данная переменная появилась благодаря подключения библиотеки в index.html
                {
                    'client_id': clientId,
                    'scope': SCOPES,
                    'immediate': params.immediate, //Определяет будет ли показываться окошко выбора нужного аккаунта или нет
                    'cookie_policy': 'single_host_origin'
                },
                authResult => { // второй праметр - коллбэк, в который приходит authRezult - результат авторизации.
                    if (authResult.error) {
                        return reject(authResult.error);
                    }
                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
                }
            );
        });
    },

    logOut() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    },

    listTaskLists() { //Метод для загрузки с API списка задач
        const request = gapi.client.tasks.tasklists.list();

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                ? reject(resp.error)
                : resolve(resp.result)
            );
        });
    },

    insertTaskList({ title }) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    getTaskListTitle({taskListId}) {
        const request = gapi.client.tasks.tasklists.get({
            tasklist: taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    updateTaskList({ taskListId, title }) {
        const request = gapi.client.tasks.tasklists.update({
            id: taskListId,
            tasklist: taskListId,
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    deleteTaskList({ taskListId }) {
        const request = gapi.client.tasks.tasklists.delete({
            tasklist: taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    listTasks(taskListId) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    insertTask({ taskListId, title, ...params }) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist : taskListId,
            title    : title,
            ...params
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    updateTask({ taskListId, taskId, ...params }) {
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            ...params
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    },

    deleteTask({taskListId, taskId}) {
        const request = gapi.client.tasks.tasks.delete({
            tasklist : taskListId,
            task     : taskId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp =>
                resp.error
                    ? reject(resp.error)
                    : resolve(resp.result)
            );
        });
    }
}