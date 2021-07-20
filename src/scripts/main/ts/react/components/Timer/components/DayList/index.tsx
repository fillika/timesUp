import React, { useEffect, memo, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

import { time } from 'Utils/Time';
import { MainTask } from 'App/components/MainTask';
import { TaskType } from 'Types/tasks';
import { useStyles } from './hooks/useStyles';

// Utils
const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

const toLocalDateString = (dateISO: string): string => {
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateISO).getDate();
  const month = new Date(dateISO).getMonth();
  const year = new Date(dateISO).getFullYear();
  return `${date} ${monthsList[month]} ${year}`;
};

export const DayList = memo<{ dateISO: string; taskList: TaskType[] }>(
  ({ dateISO, taskList }) => {
    const classes = useStyles();

    // useEffect(() => console.log('Render[DayList]', dateString));
    const dateString = useMemo(() => toLocalDateString(dateISO), [dateISO]);
    const totalDayTime = useMemo(() => getTotalDayTime(taskList), [taskList]);

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
