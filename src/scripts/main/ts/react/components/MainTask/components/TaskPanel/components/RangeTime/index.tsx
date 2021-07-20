import React, { memo } from 'react';
import { time } from 'Utils/Time';
import _isEqual from 'lodash/isEqual';
import { useStyles } from 'App/components/MainTask/hooks/useStyles';
import { TimeType } from 'Types/tasks';

type RangeTimeProps = {
  data: {
    start: string;
    stop: string;
    duration?: number;
    time?: TimeType[];
  };
};

const RangeTime: React.FC<RangeTimeProps> = ({ data: fromState }) => {
  const classes = useStyles();
  const data = JSON.parse(JSON.stringify(fromState));

  // * Так как массив всегда отсортирован, то Я могу из него доставать первый и последний элемент
  if (data.time !== undefined) {
    data.stop = data.time[0].stop;
    data.start = data.time[data.time.length - 1].start;
  }

  if (data.duration === undefined) {
    data.duration = new Date(data.stop).getTime() - new Date(data.start).getTime();
  }

  return (
    <div>
      <span className={classes.timeRange}>
        {time.createTemplateTime(data.start)}&nbsp;-&nbsp;{time.createTemplateTime(data.stop)}
      </span>
      <span className={classes.timeTotal}>{time.countTotalTime(data.duration)}</span>
    </div>
  );
};

export { RangeTime };
