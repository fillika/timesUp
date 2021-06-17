import { TaskType } from '../types/tasks';

export type TaskState = {
  taskArr: TaskType[];
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

    case 'UPDATE_TASK': {
      const newTaskArr = state.taskArr;
      newTaskArr.push(action.payload);
      
      return {
        ...state,
        taskArr: newTaskArr,
      };
    }
    default:
      return state;
  }
}
