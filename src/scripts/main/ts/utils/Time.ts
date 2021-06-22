import _ from 'lodash';

type TimeType = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

class Time {
  constructor() {}

  countTotalTime(result: number): string {
    return this.convertToStringFormat(this.createTimeObj(result));
  }

  createTimeObj(result: number): TimeType {
    const time: TimeType = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    time.seconds = Math.floor(result / 1000) % 60;
    time.minutes = Math.floor(result / 1000 / 60) % 60;
    time.hours = Math.floor(result / 1000 / 60 / 60);

    return time;
  }

  convertToStringFormat(time: TimeType): string {
    if (time.seconds.toString().length === 1) {
      time.seconds = `0${time.seconds}`;
    }

    if (time.minutes.toString().length === 1) {
      time.minutes = `0${time.minutes}`;
    }

    return `${time.hours}:${time.minutes}:${time.seconds}`;
  }
}

const time = new Time();

export { time };
