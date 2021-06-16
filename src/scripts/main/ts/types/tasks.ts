export type TaskType = {
    _id?: string;
    name: string;
    time: TimeType[];
};

export type TimeType = {
  from: number;
  to: number;
};
