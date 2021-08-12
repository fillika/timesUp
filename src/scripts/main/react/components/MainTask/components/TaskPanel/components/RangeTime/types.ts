import { TimeType } from 'Types/tasks';

export type RangeTimeProps = {
  data: TFormState;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TFormState = {
  _id: string;
  start: string;
  stop: string;
  duration?: number;
  time?: TimeType[];
};