import React, { useEffect, memo, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

import { MainTask } from 'App/components/MainTask';
import { TaskType } from 'Types/tasks';
import { useStyles } from './hooks/useStyles';
import { getTotalDayTime, toLocalDateString } from './utils';

export const TaskListInsideOneDay: React.FC<{ dateISO: string; taskList: TaskType[] }> = memo(
  ({ dateISO, taskList }) => {
    const classes = useStyles();
    const dateString = useMemo(() => toLocalDateString(dateISO), [dateISO]);
    const totalDayTime = useMemo(() => getTotalDayTime(taskList), [taskList]);

    // useEffect(() => console.log('Render[TaskListInsideOneDay]', dateString));

    return (
      <div className={classes.dayWrapper}>
        <div className={classes.taskSectionWrapper}>
          <div>{dateString}</div>

          <div className={classes.taskSectionPanel}>
            <div className={classes.totalTime}>{totalDayTime}</div>
          </div>
        </div>

        <ul>
          {taskList.map((task, index) => (
            <MainTask key={task._id} data={task} index={index} />
          ))}
        </ul>
      </div>
    );
  },
  (prev, next) => isEqual(prev.taskList, next.taskList)
);
