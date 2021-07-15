import { DatabaseTask, SortedTask } from 'Types/tasks';
import _ from 'lodash';

export type TaskState = {
  taskArr: SortedTask[];
  databaseTaskList: DatabaseTask[]
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: TaskState = {
  taskArr: [],
  databaseTaskList: []
};

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case 'GET_ALL_TASKS':
      return {
        ...state,
        databaseTaskList: action.payload.databaseTaskList,
      };
      break;

    case 'CREATE_TASK': {
      return {
        ...state,
        taskArr: action.payload,
      };
    }
    case 'UPDATE_TASK_LIST':
      return {
        ...state,
        taskArr: action.payload,
      };
      break;

    case 'DELETE_TASKS_BY_ID': {
      return {
        ...state,
        taskArr: action.payload,
      };
    }

    case 'DELETE_TASKS_BY_NAME': {
      const newArr = [...state.taskArr];
      const { date, name } = action.payload;
      const indexByDate = _.findIndex(newArr, ['date', new Date(date).toLocaleDateString()]);

      _.remove(newArr[indexByDate].tasks, el => el.name === name);

      return {
        ...state,
        taskArr: newArr,
      };
    }
    default:
      return state;
  }
}
