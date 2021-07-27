import { DatabaseTask } from 'Types/tasks';

export type SortedReport = {
  [key: string]: {
    taskList: DatabaseTask[];
    total: number;
  };
};

export type ReportState = {
  sortedTaskList: SortedReport
}

export type ReportsFetchParams = {
  start: string | number;
  stop: string | number;
  name: string;
};
