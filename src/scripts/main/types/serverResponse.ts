import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import { DatabaseTask } from 'Types/tasks';

export interface ServerResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

export type ActiveTaskResponse = {
  activeTask: activeTaskState;
};

export type TaskResponse = {
  task: DatabaseTask | DatabaseTask[];
};
