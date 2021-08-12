import curry from 'ramda/src/curry';

type TDatePickerData = {
  _id: string;
  start: string;
  stop: string;
  startDate: string;
};

const getHours = (time: string) => Number(time.slice(0, 2));
const getMinutes = (time: string) => Number(time.slice(3));
const toISOString = (time: number) => new Date(time).toISOString();
const calcTimeTemplate = curry((day: string, time: string) =>
  new Date(day).setHours(getHours(time), getMinutes(time), 0, 0)
);

export const getResult = (data: TDatePickerData) => {
  const calcTime = calcTimeTemplate(data.startDate);

  const start = calcTime(data.start);
  const stop = calcTime(data.stop) <= start ? start + 1000 : calcTime(data.stop);
  const at = start + 1000;
  const duration = stop - start;

  return {
    _id: data._id,
    start: toISOString(start),
    stop: toISOString(stop),
    at: toISOString(at),
    duration,
  };
};
