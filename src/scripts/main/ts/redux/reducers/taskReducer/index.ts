import { DatabaseTask, SortedTask } from 'Types/tasks';
import _ from 'lodash';
import { sort } from 'Utils/Sort';

export type TaskState = {
  page: number;
  isLoadMore: boolean;
  sortedTaskList: SortedTask[];
  databaseTaskList: DatabaseTask[];
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: TaskState = {
  page: 1,
  isLoadMore: false,
  sortedTaskList: [],
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
const deleteTaskByName = (state: TaskState, payload: { date: string; name: string }) => {
  const newArr = [...state.databaseTaskList];
  const { date, name } = payload;

  _.remove(newArr, task => {
    return task.name === name && new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();
  });

  return newArr;
};

export function taskReducer(state: TaskState = initialState, action: TAction): TaskState {
  switch (action.type) {
    case 'GET_ALL_TASKS': {
      const sortedTaskList = sort.sortData(action.payload.databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList: action.payload.databaseTaskList,
        isLoadMore: action.payload.isLoadMore,
      };
    }
    case 'GET_MORE_TASKS': {
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
    case 'CREATE_TASK': {
      const databaseTaskList = [...action.payload.newTask, ...state.databaseTaskList];
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    case 'UPDATE_TASK_LIST_BY_NAME': {
      const databaseTaskList = updateTaskByName(state, action.payload);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    case 'UPDATE_TASK_LIST_BY_ID': {
      const databaseTaskList = updateTaskByID(state, action.payload);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    case 'DELETE_TASKS_BY_ID': {
      const databaseTaskList = state.databaseTaskList.filter(task => task._id !== action.payload.taskID);
      const sortedTaskList = sort.sortData(databaseTaskList);

      return {
        ...state,
        sortedTaskList,
        databaseTaskList,
      };
    }
    case 'DELETE_TASKS_BY_NAME': {
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
