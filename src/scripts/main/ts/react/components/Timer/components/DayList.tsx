import React, { FC, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { TaskType } from 'Types/tasks';
import { MainTask } from 'App/components/MainTask';
import { ActiveTaskContext } from 'Scripts/main/ts/utils/Context';


export const DayList: FC<{ dateString: string; totalDayTime: string; taskList: TaskType[] }> = ({
  dateString,
  totalDayTime,
  taskList,
}) => {
  const isTimeActive = useSelector((state: RootState) => state.activeTask.isTimeActive, shallowEqual);
  // useEffect(() => console.log('Render[DayList]'));

  return (
    <ActiveTaskContext.Provider value={{ isTimeActive }}>
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
            return <MainTask key={task._id} data={memorizedTask} />;
          })}
        </ul>
      </div>
    </ActiveTaskContext.Provider>
  );
};