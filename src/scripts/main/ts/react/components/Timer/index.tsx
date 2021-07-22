import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGetTasks } from './hooks/useGetTasks';
import { ActiveTaskContext } from 'Utils/Context';
import { LoadMore } from './components/LoadMore';
import { DayList } from './components/DayList';

const Timer: React.FC = () => {
  const { isLoadMore, page, sortedTaskList } = useGetTasks();
  const isTimeActive = useSelector((state: RootState) => state.activeTask.isTimeActive, shallowEqual);

  // useEffect(() => console.log('Render[Timer]'));

  console.log(sortedTaskList);
  return (
    <ActiveTaskContext.Provider value={{ isTimeActive }}>
      <DayList taskList={sortedTaskList} />
      <LoadMore isLoadMore={isLoadMore} page={page} />
    </ActiveTaskContext.Provider>
  );
};

export default Timer;
