import { SortedTask } from '../types/tasks';
import _ from 'lodash';
import { findDuplicatesUnshift } from '../utils/tasks';

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
      const indexOfDate = _.findIndex(state.taskArr, ['date', date]);
      const newArr = [...state.taskArr];

      if (indexOfDate !== -1) {
        findDuplicatesUnshift(newArr[indexOfDate].tasks, action.payload);
      } else {
        // Todo если массив совсем новый и нужно добавить новый день
      }

      return {
        ...state,
        taskArr: newArr,
      };
    }

    case 'DELETE_TASKS_BY_ID':
      const {_id, date, name} = action.payload;
      const newArr = [...state.taskArr];
      const indexByDate = _.findIndex(newArr, ['date', date]);
      const indexByName = _.findIndex(newArr[indexByDate].tasks, ['name', name]);
      
      _.remove(newArr[indexByDate].tasks[indexByName].time!, el => el._id === _id);

      return {
        ...state,
        taskArr: newArr
      };

    default:
      return state;
  }
}
