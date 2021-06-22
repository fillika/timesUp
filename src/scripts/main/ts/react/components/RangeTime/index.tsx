import React from 'react';
import { time } from 'Utils/Time';
import { TaskType } from 'Types/tasks';

type RangeTypeComponent = {
  data: TaskType;
};

const RangeTime: React.FC<RangeTypeComponent> = ({ data }) => {
  // * Так как массив всегда отсортирован, то Я могу из него доставать первый и последний элемент
  let start = data.start,
    stop = data.stop;

  if (data.time !== undefined) {
    stop = data.time[0].stop;
    start = data.time[data.time.length - 1].start;
  }

  return (
    <div className='task-panel__time-wrapper'>
      <span className='task-panel__time task-panel__time--range'>
        {time.createTemplateTime(start)}&nbsp;-&nbsp;{time.createTemplateTime(stop)}
      </span>
      <span className='task-panel__time task-panel__time--total'>{time.countTotalTime(data.duration)}</span>
    </div>
  );
};

export { RangeTime };
