import _ from 'lodash';
import { TimeType } from 'Types/tasks';

type TimeDataObj = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

class Time {
  constructor() {}

  countTotalTime(result: number): string {
    return this.convertToStringFormat(this.createTimeObj(result));
  }

  createTimeObj(result: number): TimeDataObj {
    const time: TimeDataObj = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    time.seconds = Math.floor(result / 1000) % 60;
    time.minutes = Math.floor(result / 1000 / 60) % 60;
    time.hours = Math.floor(result / 1000 / 60 / 60);

    return time;
  }

  convertToStringFormat(time: TimeDataObj): string {
    if (time.seconds.toString().length === 1) {
      time.seconds = `0${time.seconds}`;
    }

    if (time.minutes.toString().length === 1) {
      time.minutes = `0${time.minutes}`;
    }

    if (time.hours.toString().length === 1) {
      time.hours = `0${time.hours}`;
    }

    return `${time.hours}:${time.minutes}:${time.seconds}`;
  }

  countDuration(timesList: TimeType[]) {
    let result = 0;
    timesList.forEach(el => (result += new Date(el.stop).getTime() - new Date(el.start).getTime()));
    return result;
  }

  createTemplateTime(num: number | string): string {
    const hours = new Date(num).getHours();
    const minutes = new Date(num).getMinutes();
    const seconds = new Date(num).getSeconds();

    const hoursResult = hours < 10 ? `0${hours}` : hours;
    const minutesResult = minutes < 10 ? `0${minutes}` : minutes;
    const secondResult = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursResult}:${minutesResult}:${secondResult}`;
  }
}

const time = new Time();

export { time };
