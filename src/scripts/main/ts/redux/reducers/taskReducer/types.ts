import { DatabaseTask, SortedTask } from 'Types/tasks';

export type TaskState = {
  page: number;
  isLoadMore: boolean;
  sortedTaskList: SortedTask[];
  databaseTaskList: DatabaseTask[];
};

export type TAction = {
  type: string;
  payload: any;
};