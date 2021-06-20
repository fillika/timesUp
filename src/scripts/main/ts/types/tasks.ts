export type TaskType = {
  _id: string;
  name: string;
  at: string;
  duration: number;
  start: string;
  stop: string;
  userID: string;
  time?: TimeType[];
};

export type SortedTask = {
  date: string;
  dateISO: string;
  tasks: TaskType[];
};

export type TimeType =   {
  start: string;
  stop: string;
}