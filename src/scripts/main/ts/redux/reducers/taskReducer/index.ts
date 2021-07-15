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

// Utils

const updateTaskByName = (state: TaskState, payload: { name: string; date: string; newName: string }) => {
  const { name, date, newName } = payload;

  return state.databaseTaskList.map(task => {
    const isDateEqual = new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();

    if (task.name === name && isDateEqual) {
      task.name = newName;
      return task;
    }

    return task;
  });
};
const updateTaskByID = (state: TaskState, payload: { newName: string; taskID: string }) => {
  const { newName, taskID } = payload;

  return state.databaseTaskList.map(task => {
    if (task._id === taskID) {
      task.name = newName;
      return task;
    }

    return task;
  });
};

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case 'GET_ALL_TASKS': {
      return {
        ...state,
        databaseTaskList: action.payload.databaseTaskList,
      };
    }
    case 'CREATE_TASK': {
      const newArr = [action.payload.newTask, ...state.databaseTaskList];

      return {
        ...state,
        databaseTaskList: newArr,
      };
    }
    case 'UPDATE_TASK_LIST_BY_NAME': {
      return {
        ...state,
        databaseTaskList: updateTaskByName(state, action.payload),
      };
    }
    case 'UPDATE_TASK_LIST_BY_ID': {
      return {
        ...state,
        databaseTaskList: updateTaskByID(state, action.payload),
      };
    }
    case 'DELETE_TASKS_BY_ID': {
      const filteredArr = state.databaseTaskList.filter(task => task._id !== action.payload.taskID);

      return {
        ...state,
        databaseTaskList: filteredArr,
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
