export type DatabaseTask = {
  at: string;
  duration: number;
  name: string;
  start: string;
  stop: string;
  userID: string;
  _id: string;
  _keyID?: string
}

export type TaskType = {
  _id: string;
  name: string;
  at: string;
  duration: number;
  start: string;
  stop: string;
  userID: string;
  _keyID?: string;
  time?: TimeType[];
};

export type SortedTask = {
  date: string;
  dateISO: string;
  mainTaskList: TaskType[];
};

export type TimeType =   {
  _id: string;
  start: string;
  stop: string;
}