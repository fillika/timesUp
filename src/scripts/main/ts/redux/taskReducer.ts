import { DatabaseTask, SortedTask } from 'Types/tasks';
import _ from 'lodash';

export type TaskState = {
  taskArr: SortedTask[];
  databaseTaskList: DatabaseTask[];
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: TaskState = {
  taskArr: [],
  databaseTaskList: [],
};

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case 'GET_ALL_TASKS':
      return {
        ...state,
        databaseTaskList: action.payload.databaseTaskList,
      };

    case 'CREATE_TASK': {
      const newTask: DatabaseTask = action.payload.newTask;
      const newArr = [newTask, ...state.databaseTaskList];

      return {
        ...state,
        databaseTaskList: newArr,
      };
    }
    case 'UPDATE_TASK_LIST':
      return {
        ...state,
        taskArr: action.payload,
      };

    case 'DELETE_TASKS_BY_ID': {
      return {
        ...state,
        taskArr: action.payload,
      };
    }

    case 'DELETE_TASKS_BY_NAME': {
      const newArr = [...state.databaseTaskList];
      const { date, name } = action.payload;

      _.remove(newArr, task => {
        return task.name === name && new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();
      });

      return {
        ...state,
        databaseTaskList: newArr,
      };
    }
    default:
      return state;
  }
}
