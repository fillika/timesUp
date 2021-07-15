import { DatabaseTask, SortedTask } from 'Types/tasks';
import _ from 'lodash';
import { sort } from 'Utils/Sort';

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
        taskArr: sort.sortData(action.payload.databaseTaskList),
        databaseTaskList: action.payload.databaseTaskList,
      };

    case 'CREATE_TASK': {
      const newTask: DatabaseTask = action.payload.newTask;
      const newArr = [newTask, ...state.databaseTaskList];

      return {
        ...state,
        taskArr: sort.sortData(newArr),
        databaseTaskList: newArr,
      };
    }
    case 'UPDATE_TASK_LIST':
      return {
        ...state,
        taskArr: action.payload,
      };

    case 'DELETE_TASKS_BY_ID': {
      const newArr = [...state.databaseTaskList];
      _.remove(newArr, task => task._id === action.payload.taskID);

      return {
        ...state,
        taskArr: sort.sortData(newArr),
        databaseTaskList: newArr
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
        taskArr: sort.sortData(newArr),
        databaseTaskList: newArr,
      };
    }
    default:
      return state;
  }
}
