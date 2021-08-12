export type TDispatchDatePickerData = {
  _id: string;
  start: string;
  stop: string;
  duration: number;
};

export interface IDatePicker {
  data: {
    _id: string;
    start: string;
    stop: string;
  };
  handleClose: () => void;
  sumbitHadler: (data: TDispatchDatePickerData) => void;
}