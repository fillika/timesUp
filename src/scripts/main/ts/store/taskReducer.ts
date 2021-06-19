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

    case 'CREATE_TASK': {
      return {
        ...state,
        taskArr: [...state.taskArr, action.payload],
      };
    }

    case 'UPDATE_TASK': {
      return {
        ...state,
        taskArr: action.payload,
      };
    }
    default:
      return state;
  }
}
