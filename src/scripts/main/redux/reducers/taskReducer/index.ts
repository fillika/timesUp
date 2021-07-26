import { sort } from 'Utils/Sort';
import {
  CREATE_TASK,
  DELETE_TASKS_BY_ID,
  DELETE_TASKS_BY_NAME,
  GET_ALL_TASKS,
  GET_MORE_TASKS,
  UPDATE_TASK_LIST_BY_ID,
  UPDATE_TASK_LIST_BY_NAME,
} from './actionCreators';
import { TAction, TaskState } from './types';
import { updateTaskByID, updateTaskByName, deleteTaskByName } from './utils';

const initialState: TaskState = {
  page: 1,
  isLoadMore: false,
  sortedTaskList: [],
  databaseTaskList: [],
};
// Utils

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case GET_ALL_TASKS: {
      const sortedTaskList = sort.sortData(action.payload.databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList: action.payload.databaseTaskList,
        isLoadMore: action.payload.isLoadMore,
      };
    }

    case GET_MORE_TASKS: {
      const databaseTaskList = [...state.databaseTaskList, ...action.payload.databaseTaskList];
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        page: action.payload.page,
        isLoadMore: action.payload.isLoadMore,
        sortedTaskList,
        databaseTaskList,
      };
    }

    case CREATE_TASK: {
      const databaseTaskList = [...action.payload.newTask, ...state.databaseTaskList];
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    
    case UPDATE_TASK_LIST_BY_NAME: {
      const databaseTaskList = updateTaskByName(state, action.payload);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }

    case UPDATE_TASK_LIST_BY_ID: {
      const databaseTaskList = updateTaskByID(state, action.payload);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }

    case DELETE_TASKS_BY_ID: {
      const databaseTaskList = state.databaseTaskList.filter(task => task._id !== action.payload.taskID);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }

    case DELETE_TASKS_BY_NAME: {
      const databaseTaskList = deleteTaskByName(state, action.payload);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    default:
      return state;
  }
}
