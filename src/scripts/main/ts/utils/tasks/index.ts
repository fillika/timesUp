import { TimeType } from '../../types/tasks';

type Time = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

export function countTotalTime(timeArr: TimeType[]): string {
  let result = 0;
  const time: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  timeArr.forEach(timeObj => {
    result += new Date(timeObj.to).getTime() - new Date(timeObj.from).getTime();
  });

  time.seconds = Math.floor(result / 1000) % 60;
  time.minutes = Math.floor(result / 1000 / 60) % 60;
  time.hours = Math.floor(result / 1000 / 60 / 60);

  return convertToStringFormat(time);
}

function convertToStringFormat(time: Time): string {
  if (time.seconds.toString().length === 1) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.minutes.toString().length === 1) {
    time.minutes = `0${time.minutes}`;
  }

  return `${time.hours}:${time.minutes}:${time.seconds}`;
}
