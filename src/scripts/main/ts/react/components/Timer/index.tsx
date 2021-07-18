import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { TaskType } from 'Types/tasks';
import { time } from 'Utils/Time';
import { useGetTasks } from './useGetTasks';
import { DayList } from './components/DayList';
import { ActiveTaskContext } from 'Utils/Context';
import { LoadMore } from './components/LoadMore';

// Utils
const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

const Timer: React.FC = () => {
  const { isLoadMore, page, sortedTaskList } = useGetTasks();
  const isTimeActive = useSelector((state: RootState) => state.activeTask.isTimeActive, shallowEqual);

  return (
    <ActiveTaskContext.Provider value={{ isTimeActive }}>
      <div>
        {sortedTaskList.map(({ dateISO, mainTaskList }) => {
          if (!mainTaskList.length) {
            return null;
          }

          const dateString = new Date(dateISO).toLocaleDateString();
          const totalDayTime = getTotalDayTime(mainTaskList);

          return (
            <DayList key={dateString} taskList={mainTaskList} dateString={dateString} totalDayTime={totalDayTime} />
          );
        })}
      </div>

      <LoadMore isLoadMore={isLoadMore} page={page} />
    </ActiveTaskContext.Provider>
  );
};

export default Timer;
