import { DatabaseTask, TaskType } from 'Types/tasks';

export const GET_ALL_TASKS = 'GET_ALL_TASKS',
  GET_MORE_TASKS = 'GET_MORE_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK_LIST_BY_NAME = 'UPDATE_TASK_LIST_BY_NAME',
  UPDATE_TASK_LIST_BY_ID = 'UPDATE_TASK_LIST_BY_ID',
  DELETE_TASKS_BY_ID = 'DELETE_TASKS_BY_ID',
  DELETE_TASKS_BY_NAME = 'DELETE_TASKS_BY_NAME';

export const createTask = (payload: DatabaseTask[]) => ({ type: CREATE_TASK, payload: { newTask: payload } });
export const updateTaskByNameAC = (val: string, currentTask: TaskType) => ({
  type: UPDATE_TASK_LIST_BY_NAME,
  payload: {
    name: currentTask.name,
    date: currentTask.at,
    newName: val,
  },
});
export const updateTaskByIDAC = (id: string, val: string) => ({
  type: UPDATE_TASK_LIST_BY_ID,
  payload: { taskID: id, newName: val },
});
export const deleteTaskByIDAC = (id: string) => ({ type: DELETE_TASKS_BY_ID, payload: { taskID: id } });
export const deleteTaskByNameAC = (currentTask: TaskType) => ({
  type: DELETE_TASKS_BY_NAME,
  payload: {
    date: currentTask.at,
    name: currentTask.name,
  },
});
