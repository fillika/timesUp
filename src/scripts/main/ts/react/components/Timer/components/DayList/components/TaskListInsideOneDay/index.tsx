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

export const TaskListInsideOneDay: React.FC<{ dateISO: string; taskList: TaskType[] }> = ({ dateISO, taskList }) => {
  const classes = useStyles();
  const dateString = useMemo(() => toLocalDateString(dateISO), [dateISO]);
  const totalDayTime = useMemo(() => getTotalDayTime(taskList), [taskList]);

  useEffect(() => console.log('Render[DayList]', dateString));

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
          <MainTask key={task._id} data={task} index={index + 1} />
        ))}
      </ul>
    </div>
  );
};
