export type TaskType = {
  _id: string;
  name: string;
  at: string;
  duration: number;
  start: string;
  stop: string;
  userID: string;
};

export type SortedTask = {
  date: string,
  dateISO: string,
  tasks: TaskType[]
}