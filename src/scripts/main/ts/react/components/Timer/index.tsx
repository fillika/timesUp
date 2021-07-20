import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { TaskType } from 'Types/tasks';
import { time } from 'Utils/Time';
import { useGetTasks } from './hooks/useGetTasks';
import { DayList } from './components/DayList';
import { ActiveTaskContext } from 'Utils/Context';
import { LoadMore } from './components/LoadMore';

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

          // const dateString = new Date(dateISO).toLocaleDateString();
          const dateString = toLocalDateString(dateISO);
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
