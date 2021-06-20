import { SortedTask } from '../types/tasks';
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
    case 'ADD_TASKS':
      return {
        ...state,
        taskArr: action.payload,
      };

    case 'CREATE_TASK': {
      const date = new Date(action.payload.at).toLocaleDateString();
      const index = _.findIndex(state.taskArr, ['date', date]);
      const newArr = [...state.taskArr];

      if (index !== -1) {
        newArr[index].tasks.unshift(action.payload);
      }

      return {
        ...state,
        taskArr: newArr,
      };
    }
    default:
      return state;
  }
}
