import { activeTaskState } from 'Redux/reducers/activeTaskReducer';

export interface ServerResponse<T> {
  status: 'success';
  message: string;
  data: T;
}

export type ActiveTaskResponse = {
  activeTask: activeTaskState
}
