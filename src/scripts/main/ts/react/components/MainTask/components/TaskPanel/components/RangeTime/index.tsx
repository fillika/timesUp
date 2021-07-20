import React from 'react';
import { time } from 'Utils/Time';
import { TimeType } from 'Types/tasks';
import { useStyles } from 'App/components/MainTask/hooks/useStyles';

type RangeTypeComponent = {
  start: string;
  stop: string;
  timeArr?: TimeType[];
  duration?: number;
};

const RangeTime: React.FC<RangeTypeComponent> = ({ start, stop, duration, timeArr }) => {
  const classes = useStyles();
  // * Так как массив всегда отсортирован, то Я могу из него доставать первый и последний элемент
  if (timeArr !== undefined) {
    stop = timeArr[0].stop;
    start = timeArr[timeArr.length - 1].start;
  }

  if (duration === undefined) {
    duration = new Date(stop).getTime() - new Date(start).getTime();
  }

  return (
    <div>
      <span className={classes.timeRange}>
        {time.createTemplateTime(start)}&nbsp;-&nbsp;{time.createTemplateTime(stop)}
      </span>
      <span className={classes.timeTotal}>{time.countTotalTime(duration)}</span>
    </div>
  );
};

export { RangeTime };
