import { time } from 'Utils/Time';
import React from 'react';

/**
 * Локально в файле создал. Изолировал рендер внутри функции, чтобы не было проблем с оптимизацией
 */
type TimeComponent = {
  start: string;
  stop: string;
};

export const Time: React.FC<TimeComponent> = ({ start, stop }) => {
  return (
    <div className='task-panel__time-wrapper'>
      <span className='task-panel__time task-panel__time--range'>
        {time.createTemplateTime(start)}&nbsp;-&nbsp;{time.createTemplateTime(stop)}
      </span>
      <span className='task-panel__time task-panel__time--total'>
        {time.countTotalTime(new Date(stop).getTime() - new Date(start).getTime())}
      </span>
    </div>
  );
};

