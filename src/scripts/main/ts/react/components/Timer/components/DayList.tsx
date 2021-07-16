import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { createSelector } from 'reselect';
import { TaskType } from 'Types/tasks';
import { MainTask } from 'App/components/MainTask';

const memoIsTimeActive = createSelector(
  (state: RootState) => state.activeTask.isTimeActive,
  (isTimeActive: boolean) => isTimeActive
);

export const DayList: FC<{ dateString: string; totalDayTime: string; taskList: TaskType[] }> = ({
  dateString,
  totalDayTime,
  taskList,
}) => {
  const isTimeActive = useSelector(memoIsTimeActive);

  useEffect(() => console.log('Render[DayList]'));

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
        {taskList.map(task => {
          const memorizedTask = useMemo(() => task, []);
          return <MainTask key={task._id} data={memorizedTask} isTimeActive={isTimeActive} />;
        })}
      </ul>
    </div>
  );
};
