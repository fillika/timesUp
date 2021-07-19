import React, { useEffect, memo } from 'react';

import { TaskType } from 'Types/tasks';
import { MainTask } from 'App/components/MainTask';
import _ from 'lodash';

export const DayList = memo<{ dateString: string; totalDayTime: string; taskList: TaskType[] }>(
  ({ dateString, totalDayTime, taskList }) => {
    // useEffect(() => console.log('Render[DayList]'));

    return (
      <div className='task-section'>
        <div className='task-section__wrapper'>
          <div>{dateString}</div>

          <div className='task-section__panel'>
            <div className='task-section__total-time'>{totalDayTime}</div>
            <div className='task-section__menu'>...</div>
          </div>
        </div>

        <ul className='task-list'>
          {taskList.map(task => (
            <MainTask key={task._id} data={task} />
          ))}
        </ul>
      </div>
    );
  },
  (prev, next) => _.isEqual(prev.taskList, next.taskList)
);
