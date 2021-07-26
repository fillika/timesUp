import { DatabaseTask } from 'Types/tasks';

export const GET_ALL_TASKS = 'GET_ALL_TASKS',
  GET_MORE_TASKS = 'GET_MORE_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK_LIST_BY_NAME = 'UPDATE_TASK_LIST_BY_NAME',
  UPDATE_TASK_LIST_BY_ID = 'UPDATE_TASK_LIST_BY_ID',
  DELETE_TASKS_BY_ID = 'DELETE_TASKS_BY_ID',
  DELETE_TASKS_BY_NAME = 'DELETE_TASKS_BY_NAME';

export const createTask = (payload: DatabaseTask[]) => ({ type: CREATE_TASK, payload: { newTask: payload } });
