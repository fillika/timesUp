import { SortedTask } from 'Types/tasks';
import { sort } from 'Utils/Sort';
import { time } from 'Utils/Time';
import _ from 'lodash';

export type TaskState = {
  taskArr: SortedTask[];
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: TaskState = {
  taskArr: [],
};

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case 'GET_ALL_TASKS':
      return {
        ...state,
        taskArr: action.payload,
      };
      break;

    case 'CREATE_TASK': {
      const date = new Date(action.payload.at).toLocaleDateString();
      const indexOfDate = _.findIndex(state.taskArr, ['date', date]);
      const newArr = [...state.taskArr];

      if (indexOfDate !== -1) {
        sort.findDuplicatesUnshift(newArr[indexOfDate].tasks, action.payload);
      } else {
        const sortedTask = sort.createFirstSortedTask(action.payload);
        newArr.unshift(sortedTask);
      }

      return {
        ...state,
        taskArr: newArr,
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
