import React, { useEffect, memo } from 'react';

import { TaskType } from 'Types/tasks';
import { MainTask } from 'App/components/MainTask';
import isEqual from 'lodash/isEqual';
import { useStyles } from './hooks/useStyles';

export const DayList = memo<{ dateString: string; totalDayTime: string; taskList: TaskType[] }>(
  ({ dateString, totalDayTime, taskList }) => {
    // useEffect(() => console.log('Render[DayList]'));
    const classes = useStyles();

    return (
      <div>
        <div className={classes.taskSectionWrapper}>
          <div>{dateString}</div>

          <div className={classes.taskSectionPanel}>
            <div className={classes.totalTime}>{totalDayTime}</div>
            <div className={classes.menu}>...</div>
          </div>
        </div>

        <ul>
          {taskList.map(task => (
            <MainTask key={task._id} data={task} />
          ))}
        </ul>
      </div>
    );
  },
  (prev, next) => isEqual(prev.taskList, next.taskList)
);
