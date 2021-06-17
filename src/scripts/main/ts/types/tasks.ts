export type TaskType = {
    _id?: string;
    name: string;
    time: TimeType[];
};

export type TimeType = {
  _id: string;
  start: number;
  end: number;
};
