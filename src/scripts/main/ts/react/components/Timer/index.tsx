import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

import { useGetTasks } from './hooks/useGetTasks';
import { DayList } from './components/DayList';
import { ActiveTaskContext } from 'Utils/Context';
import { LoadMore } from './components/LoadMore';

const Timer: React.FC = () => {
  const { isLoadMore, page, sortedTaskList } = useGetTasks();
  const isTimeActive = useSelector((state: RootState) => state.activeTask.isTimeActive, shallowEqual);

  // useEffect(() => console.log('Render[Timer]'));

  return (
    <ActiveTaskContext.Provider value={{ isTimeActive }}>
      <div>
        {sortedTaskList.map(({ dateISO, mainTaskList }) => {
          if (!mainTaskList.length) {
            return null;
          }

          return <DayList key={dateISO} taskList={mainTaskList} dateISO={dateISO} />;
        })}
      </div>

      <LoadMore isLoadMore={isLoadMore} page={page} />
    </ActiveTaskContext.Provider>
  );
};

export default Timer;
